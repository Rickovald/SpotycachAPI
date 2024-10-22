import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LocalGuard } from "./guard/local.guard";
import { JwtGuard } from "./guard/jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    // ..../auth/register
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        await this.authService.register(createUserDto);
    }

    // ..../auth/login
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    // ..../auth/profile
    @Get('profile')
    @UseGuards(JwtGuard)
    profile(@Request() req) {
        return req.user;
    }
}