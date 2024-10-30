import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Req() req) {
        const userAgent = req.get('User-Agent');
        const ip = req.ip;
        const language = req.get('Accept-Language');
        const device = `${userAgent} ${ip} ${language}`;
        return await this.authService.register(registerDto, device);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req) {
        const userAgent = req.get('User-Agent');
        const ip = req.ip;
        const language = req.get('Accept-Language');
        const device = `${userAgent} ${ip} ${language}`;

        return await this.authService.login(loginDto, device);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() req) {
        return await this.authService.logout(req.user.sessionId);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Req() req) {
        return await this.authService.refreshAccessToken(req.body.refreshToken);
    }
}