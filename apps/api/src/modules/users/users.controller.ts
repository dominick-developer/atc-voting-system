// apps/api/src/modules/users/users.controller.ts
import {
    Controller, Get, Post, Delete, Param, Body, Query,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly users: UsersService) { }

    /** GET /users?page=1&pageSize=10&search=john&includeRoles=true */
    @Get()
    @Roles("SYSTEM_ADMIN")
    async list(
        @Query("page") page = "1",
        @Query("pageSize") pageSize = "10",
        @Query("search") search?: string,
        @Query("includeRoles") includeRoles?: string,
    ) {
        const skip = (Number(page) - 1) * Number(pageSize);
        const { data, total } = await this.users.list({
            skip,
            take: Number(pageSize),
            search,
            includeRoles: includeRoles === "true",
        });
        return { data, total, page: Number(page), pageSize: Number(pageSize) };
    }

    /** POST /users/:id/roles  body: { roleId } */
    @Post(":id/roles")
    @Roles("SYSTEM_ADMIN")
    async assignRole(@Param("id") userId: string, @Body() body: { roleId: string }) {
        return this.users.assignRole(userId, body.roleId);
    }

    /** DELETE /users/:id/roles/:roleId */
    @Delete(":id/roles/:roleId")
    @Roles("SYSTEM_ADMIN")
    async removeRole(
        @Param("id") userId: string,
        @Param("roleId") roleId: string,
    ) {
        return this.users.removeRole(userId, roleId);
    }
}