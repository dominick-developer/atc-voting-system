// apps/api/src/modules/roles/roles.controller.ts
import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { PrismaService } from "@/common/prisma/prisma.service";

@Controller("roles")
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.role.findMany({ orderBy: { name: "asc" } });
  }
}
