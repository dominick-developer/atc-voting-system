// apps/api/src/common/crypto/crypto.service.ts
import { Injectable, Logger } from "@nestjs/common";
import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    scryptSync,
} from "crypto";

@Injectable()
export class CryptoService {
    private readonly logger = new Logger(CryptoService.name);
    private readonly key: Buffer;
    private readonly salt = "atc-settings-v1";

    constructor() {
        const master = process.env.SETTINGS_ENCRYPTION_KEY;
        if (!master || master.length < 32) {
            throw new Error(
                "SETTINGS_ENCRYPTION_KEY must be set and at least 32 characters long.",
            );
        }
        // Derive a stable 32-byte key from the master secret
        this.key = scryptSync(master, this.salt, 32);
    }

    /** Encrypts a plaintext string into iv.ciphertext.tag (base64 parts). */
    encrypt(plain: string): string {
        const iv = randomBytes(12);
        const cipher = createCipheriv("aes-256-gcm", this.key, iv);
        const encrypted = Buffer.concat([
            cipher.update(plain, "utf8"),
            cipher.final(),
        ]);
        const tag = cipher.getAuthTag();
        return `${iv.toString("base64")}.${encrypted.toString("base64")}.${tag.toString("base64")}`;
    }

    /** Decrypts a payload produced by encrypt(). */
    decrypt(payload: string): string {
        const parts = payload.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid ciphertext format");
        }
        const [ivB64, encB64, tagB64] = parts;
        const iv = Buffer.from(ivB64, "base64");
        const encrypted = Buffer.from(encB64, "base64");
        const tag = Buffer.from(tagB64, "base64");
        const decipher = createDecipheriv("aes-256-gcm", this.key, iv);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
            "utf8",
        );
    }
}