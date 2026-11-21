import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminService } from "./admin.service";
import { AdminGuard } from "./admin.guard";
import { SetRolesDto } from "./dto/set-roles.dto";

@Controller("admin")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}
  @Get("users") listUsers() { return this.admin.listUsers(); }
  @Post("users/:id/roles")
  setRoles(@Param("id") id: string, @Body() dto: SetRolesDto) {
    return this.admin.setRoles(id, dto.roles);
  }
}
