// apps/api/src/modules/integrations/integrations.service.ts
import {
    BadRequestException,
    Injectable,
    Logger,
} from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "@/common/prisma/prisma.service";
import { CryptoService } from "@/common/crypto/crypto.service";

const ATC_KEY = "integrations.atc";

export interface AtcConfigResponse {
    enabled: boolean;
    baseUrl: string;
    apiKeyMasked: string | null;
    hasApiKey: boolean;
    timeoutMs: number;
    lastTestedAt: string | null;
    lastTestStatus: "SUCCESS" | "FAILED" | null;
}

export interface UpdateAtcDto {
    enabled?: boolean;
    baseUrl?: string;
    apiKey?: string;
    timeoutMs?: number;
}

@Injectable()
export class IntegrationsService {
    private readonly logger = new Logger(IntegrationsService.name);

    constructor(
        private prisma: PrismaService,
        private crypto: CryptoService,
    ) { }

    async getAtc(): Promise<AtcConfigResponse> {
        const row = await this.prisma.systemSetting.findUnique({
            where: { key: ATC_KEY },
        });
        const v: any = (row?.value as any) ?? {};
        return {
            enabled: v.enabled ?? false,
            baseUrl: v.baseUrl ?? "",
            hasApiKey: !!v.apiKeyCipher,
            apiKeyMasked: v.apiKeyCipher ? this.maskKey(v.apiKeyCipher) : null,
            timeoutMs: v.timeoutMs ?? 10000,
            lastTestedAt: v.lastTestedAt ?? null,
            lastTestStatus: v.lastTestStatus ?? null,
        };
    }

    async updateAtc(
        dto: UpdateAtcDto,
        actorId?: string,
    ): Promise<AtcConfigResponse> {
        const existing = await this.prisma.systemSetting.findUnique({
            where: { key: ATC_KEY },
        });
        const current: any = (existing?.value as any) ?? {};

        const next: any = { ...current };
        if (dto.enabled !== undefined) next.enabled = dto.enabled;
        if (dto.baseUrl !== undefined) next.baseUrl = dto.baseUrl.trim();
        if (dto.timeoutMs !== undefined) next.timeoutMs = dto.timeoutMs;
        if (dto.apiKey !== undefined) {
            // Empty string = clear the key
            next.apiKeyCipher = dto.apiKey
                ? this.crypto.encrypt(dto.apiKey)
                : null;
        }

        await this.prisma.systemSetting.upsert({
            where: { key: ATC_KEY },
            create: { key: ATC_KEY, value: next },
            update: { value: next },
        });

        await this.audit(actorId, "ATC_INTEGRATION_UPDATED", {
            // NEVER include the API key
            changed: Object.keys(dto).filter((k) => k !== "apiKey"),
            apiKeyChanged: dto.apiKey !== undefined,
        });

        return this.getAtc();
    }

    async testConnection(actorId?: string) {
        const row = await this.prisma.systemSetting.findUnique({
            where: { key: ATC_KEY },
        });
        const v: any = (row?.value as any) ?? {};
        if (!v.baseUrl) throw new BadRequestException("Base URL not configured");
        if (!v.apiKeyCipher)
            throw new BadRequestException("API key not configured");

        const apiKey = this.crypto.decrypt(v.apiKeyCipher);
        const base = String(v.baseUrl).replace(/\/$/, "");
        const timeout = v.timeoutMs ?? 10000;

        // Try /health, then /, then /ping
        const endpoints = ["/health", "/ping", "/"];
        let lastError: any = null;
        const start = Date.now();

        for (const ep of endpoints) {
            try {
                const res = await axios.get(`${base}${ep}`, {
                    headers: {
                        "X-API-Key": apiKey,
                        Authorization: `Bearer ${apiKey}`,
                        Accept: "application/json",
                    },
                    timeout,
                    validateStatus: (s) => s < 500,
                });
                if (res.status < 400) {
                    const result = {
                        success: true,
                        statusCode: res.status,
                        endpoint: ep,
                        durationMs: Date.now() - start,
                        testedAt: new Date().toISOString(),
                    };
                    await this.saveTestResult(v, "SUCCESS", result.testedAt);
                    await this.audit(actorId, "ATC_INTEGRATION_TESTED", {
                        success: true,
                        endpoint: ep,
                    });
                    return result;
                }
                lastError = { status: res.status, data: res.data };
            } catch (e: any) {
                lastError = e;
            }
        }

        const testedAt = new Date().toISOString();
        const result = {
            success: false,
            statusCode: lastError?.response?.status ?? null,
            message:
                lastError?.response?.data?.message ??
                lastError?.message ??
                "Unable to reach the ATC API",
            durationMs: Date.now() - start,
            testedAt,
        };
        await this.saveTestResult(v, "FAILED", testedAt);
        await this.audit(actorId, "ATC_INTEGRATION_TESTED", {
            success: false,
            statusCode: result.statusCode,
        });
        return result;
    }

    async recentSyncLogs(limit = 20) {
        return this.prisma.dataSyncLog.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
        });
    }

    // â”€â”€â”€ private helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    private maskKey(cipher: string): string {
        try {
            const plain = this.crypto.decrypt(cipher);
            if (plain.length <= 4) return "â€¢â€¢â€¢â€¢";
            return `â€¢â€¢â€¢â€¢${plain.slice(-4)}`;
        } catch {
            return "â€¢â€¢â€¢â€¢";
        }
    }

    private async saveTestResult(v: any, status: string, testedAt: string) {
        await this.prisma.systemSetting.update({
            where: { key: ATC_KEY },
            data: {
                value: {
                    ...v,
                    lastTestedAt: testedAt,
                    lastTestStatus: status,
                },
            },
        });
    }

    private async audit(
        actorId: string | undefined,
        eventType: string,
        payload: any,
    ) {
        if (!actorId) return;
        await this.prisma.auditLog.create({
            data: {
                eventType,
                actorId,
                payload,
                // entryHash and previousHash should be filled by your existing
                // hash-chain helper. If you have one, replace the two lines below.
                entryHash: "pending",
                previousHash: null,
            },
        });
    }
}
