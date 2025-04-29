import { Controller, Post, Body, Req, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from '../common/dtos/register.dto';
import { LoginDto } from '../common/dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto, @Req() req) {
        console.log(registerDto);

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
    async logout(
        @Req() req,
        @Res() res: Response
    ) {
        const userAgent = req.get('User-Agent');
        const ip = req.ip;
        const language = req.get('Accept-Language');
        const device = `${userAgent} ${ip} ${language}`;
        const session = await this.authService.logout(device);
        return res.status(HttpStatus.OK).json({
            message: 'Выход успешен',
            session
        });
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Req() req) {
        const userAgent = req.get('User-Agent');
        const ip = req.ip;
        const language = req.get('Accept-Language');
        const device = `${userAgent} ${ip} ${language}`;
        const token = await this.authService.refreshAccessToken(req.body.refreshToken, device);
        console.log(token);
        return token;
    }
}