import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface AtcIdentity {
  admissionNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  programme?: string;
  class?: string;
  ntaLevel?: number;
  dateOfBirth?: Date;
}

@Injectable()
export class AtcApiService {
  private readonly logger = new Logger(AtcApiService.name);
  constructor(private readonly config: ConfigService) {}

  get mode(): "mock" | "live" {
    return this.config.get<string>("ATC_API_ENABLED") === "true" ? "live" : "mock";
  }

  async verifyCredentials(admissionNumber: string, password: string): Promise<AtcIdentity | null> {
    if (this.mode === "mock") return this.mockVerify(admissionNumber);
    return this.liveVerify(admissionNumber, password);
  }

  private mockVerify(admissionNumber: string): AtcIdentity | null {
    const adm = admissionNumber.trim().toUpperCase();
    const mocks: Record<string, AtcIdentity> = {
      "ATC/2024/0001": { admissionNumber: adm, firstName: "Amina",  lastName: "Hassan", programme: "ICT", class: "NTA 5A", ntaLevel: 5, dateOfBirth: new Date("2003-01-01") },
      "ATC/2024/0002": { admissionNumber: adm, firstName: "Baraka", lastName: "Mwenda", programme: "ICT", class: "NTA 5A", ntaLevel: 5, dateOfBirth: new Date("2002-01-01") },
      "ATC/2024/0003": { admissionNumber: adm, firstName: "Daudi",  lastName: "Mushi",  programme: "ICT", class: "NTA 5A", ntaLevel: 5, dateOfBirth: new Date("1990-01-01") },
      "ATC/2024/0004": { admissionNumber: adm, firstName: "Fatuma", lastName: "Salum",  programme: "ICT", class: "NTA 5A", ntaLevel: 5, dateOfBirth: new Date("1985-01-01") },
      "ATC/2024/0005": { admissionNumber: adm, firstName: "Joseph", lastName: "Mkapa",  programme: "ICT", class: "NTA 5A", ntaLevel: 5, dateOfBirth: new Date("1988-01-01") },
    };
    if (mocks[adm]) return mocks[adm];
    if (/^ATC\/\d{4}\/\d+$/i.test(adm)) {
      return {
        admissionNumber: adm,
        firstName: "Student",
        lastName: adm.split("/").pop() ?? "Unknown",
        programme: "ICT", class: "NTA 5A", ntaLevel: 5,
        dateOfBirth: new Date(`${new Date().getFullYear() - 20}-01-01`),
      };
    }
    return null;
  }

  private async liveVerify(admissionNumber: string, password: string): Promise<AtcIdentity | null> {
    const baseUrl = this.config.get<string>("ATC_API_BASE_URL");
    const apiKey  = this.config.get<string>("ATC_API_KEY");
    const timeout = Number(this.config.get("ATC_API_TIMEOUT_MS") ?? 5000);
    if (!baseUrl) { this.logger.error("ATC_API_ENABLED=true but ATC_API_BASE_URL missing"); return null; }
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      const res = await fetch(`${baseUrl}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey ?? "" },
        body: JSON.stringify({ admissionNumber, password }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) { this.logger.warn(`ATC API returned ${res.status}`); return null; }
      const data: any = await res.json();
      return {
        admissionNumber: data.admissionNumber ?? admissionNumber,
        firstName: data.firstName ?? "Unknown",
        lastName: data.lastName ?? "Unknown",
        middleName: data.middleName,
        email: data.email, phoneNumber: data.phoneNumber,
        programme: data.programme, class: data.class, ntaLevel: data.ntaLevel,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      };
    } catch (err) {
      this.logger.error(`ATC API call failed: ${(err as Error).message}`);
      return null;
    }
  }
}
