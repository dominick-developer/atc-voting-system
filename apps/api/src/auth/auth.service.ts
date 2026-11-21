import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { mockUsers, MockUser } from "../mock/users";
import { PrismaService } from "../common/prisma/prisma.service";
import { AtcApiService } from "../modules/integrations/atc-api.service";

export type JwtPayload = { sub: string; role: string; admissionNumber: string };
type QuestionType = "yearOfBirth" | "firstName" | "middleName" | "lastName";

const QUESTION_TEXT: Record<QuestionType, string> = {
  yearOfBirth: "What is your year of birth?",
  firstName:   "What is your first name?",
  middleName:  "What is your middle name?",
  lastName:    "What is your last name?",
};

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService, private readonly atc: AtcApiService) {}

  lookup(admissionNumber: string) {
    const user = mockUsers.find(
      (u) => u.admissionNumber.toLowerCase() === admissionNumber.trim().toLowerCase(),
    );
    if (!user) return { found: false as const };

    const types: QuestionType[] = ["yearOfBirth", "firstName", "middleName", "lastName"];
    const chosen = types[Math.floor(Math.random() * types.length)];

    return {
      found: true as const,
      firstName: user.fullName.split(" ")[0],
      role: user.role,
      question: { type: chosen, text: QUESTION_TEXT[chosen] },
    };
  }

  private checkAnswer(user: MockUser, type: QuestionType, answer: string): boolean {
    const n = answer.trim().toLowerCase();
    if (type === "yearOfBirth") return user.yearOfBirth === n;
    if (type === "firstName")   return user.fullName.split(" ")[0].toLowerCase() === n;
    if (type === "middleName")  return user.middleName.toLowerCase() === n;
    if (type === "lastName")    return user.fullName.split(" ").slice(-1)[0].toLowerCase() === n;
    return false;
  }

  verifyAndLogin(admissionNumber: string, answer: string, type: QuestionType) {
    const user = mockUsers.find(
      (u) => u.admissionNumber.toLowerCase() === admissionNumber.trim().toLowerCase(),
    );
    if (!user) throw new UnauthorizedException("Admission number not found");
    if (!this.checkAnswer(user, type, answer)) {
      throw new UnauthorizedException("Verification failed");
    }

    const payload: JwtPayload = { sub: user.id, role: user.role, admissionNumber: user.admissionNumber };
    const accessToken = this.jwt.sign(payload);

    const { yearOfBirth, secondarySchool, middleName, ...rest } = user;
    return { accessToken, user: rest };
  }

  login(admissionNumber: string, yearOfBirth: string) {
    return this.verifyAndLogin(admissionNumber, yearOfBirth, "yearOfBirth");
  }
  async atcLogin(admissionNumber: string, password: string) {
    if (!admissionNumber || !password) throw new BadRequestException("Missing credentials");
    const identity = await this.atc.verifyCredentials(admissionNumber, password);
    if (!identity) throw new UnauthorizedException("ATC authentication failed");

    await this.ensureRoles();

    let student = await this.prisma.student.findUnique({ where: { admissionNumber: identity.admissionNumber } });
    if (!student) {
      student = await this.prisma.student.create({
        data: {
          admissionNumber: identity.admissionNumber,
          firstName: identity.firstName,
          middleName: identity.middleName,
          lastName: identity.lastName,
          dateOfBirth: identity.dateOfBirth,
          phoneNumber: identity.phoneNumber,
          email: identity.email,
          ntaLevel: identity.ntaLevel,
          status: "ACTIVE" as any,
          sourceType: "API" as any,
        },
      });
    }

    const email = identity.email ?? `${identity.admissionNumber.replace(/\//g, "-").toLowerCase()}@atc.ac.tz`;
    let user = await this.prisma.user.findFirst({
      where: { email },
      include: { roles: { include: { role: true } } },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: { email, fullName: `${identity.firstName} ${identity.lastName}`, isActive: true },
        include: { roles: { include: { role: true } } },
      });
    }

    if (user.roles.length === 0) {
      const studentRole = await this.prisma.role.findUnique({ where: { name: "STUDENT" as any } });
      if (studentRole) {
        await this.prisma.userRole.create({ data: { userId: user.id, roleId: studentRole.id } });
        user = await this.prisma.user.findUnique({ where: { id: user.id }, include: { roles: { include: { role: true } } } });
      }
    }

    await this.prisma.user.update({ where: { id: user!.id }, data: { lastLoginAt: new Date() } });

    const priority = ["SYSTEM_ADMIN","ELECTORAL_COMMISSION","ELECTION_OFFICER","RESULTS_OFFICER","OBSERVER","CANDIDATE","STUDENT"];
    const userRoles = (user?.roles ?? []).map((ur) => ur.role.name);
    const primaryRole = priority.find((r) => userRoles.includes(r as any)) ?? "STUDENT";

    const payload: JwtPayload = { sub: user!.id, role: primaryRole, admissionNumber: identity.admissionNumber };
    const accessToken = this.jwt.sign(payload);

    return {
      accessToken,
      user: {
        id: user!.id,
        admissionNumber: identity.admissionNumber,
        fullName: user!.fullName,
        email: user!.email,
        role: primaryRole,
        roles: userRoles,
        programme: identity.programme ?? "",
        class: identity.class ?? "",
      },
    };
  }

  private async ensureRoles() {
    const roles = ["SYSTEM_ADMIN","ELECTORAL_COMMISSION","ELECTION_OFFICER","RESULTS_OFFICER","OBSERVER","CANDIDATE","STUDENT"];
    for (const name of roles) {
      await this.prisma.role.upsert({
        where: { name: name as any },
        update: {},
        create: { name: name as any, description: `${name} role` },
      });
    }
  }


  
}
