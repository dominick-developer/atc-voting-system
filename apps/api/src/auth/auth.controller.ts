import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AtcLoginDto, LoginDto, LookupDto, VerifyLoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("lookup")
  lookup(@Body() dto: LookupDto) {
    return this.authService.lookup(dto.admissionNumber);
  }

  @Post("verify")
  verify(@Body() dto: VerifyLoginDto) {
    return this.authService.verifyAndLogin(dto.admissionNumber, dto.answer, dto.type);
  }

  @Post("atc-login")
  atcLogin(@Body() dto: AtcLoginDto) {
    return this.authService.atcLogin(dto.admissionNumber, dto.password);
  }

    @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.admissionNumber, dto.yearOfBirth);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  me(@Req() req: any) {
    return this.authService.me(req.user.userId);
  }
}
