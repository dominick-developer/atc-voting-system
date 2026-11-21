import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";

const VALID_ROLES = ["SYSTEM_ADMIN","ELECTORAL_COMMISSION","ELECTION_OFFICER","RESULTS_OFFICER","OBSERVER","CANDIDATE","STUDENT"];

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    const users = await this.prisma.user.findMany({
      include: { roles: { include: { role: true } } },
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      isActive: u.isActive,
      roles: u.roles.map((ur) => ur.role.name),
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
    }));
  }

  async setRoles(userId: string, roleNames: string[]) {
    for (const r of roleNames) {
      if (!VALID_ROLES.includes(r)) throw new BadRequestException(`Invalid role: ${r}`);
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const roles = await this.prisma.role.findMany({ where: { name: { in: roleNames as any } } });
    await this.prisma.userRole.deleteMany({ where: { userId } });
    for (const role of roles) {
      await this.prisma.userRole.create({ data: { userId, roleId: role.id } });
    }
    return { id: userId, roles: roleNames };
  }
}
