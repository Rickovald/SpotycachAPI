import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(registerDto: RegisterDto, deviceIp: string) {

        const hashedPassword = await this.generatePasswordHash(registerDto.password);
        const user = this.userRepository.create({ ...registerDto, password: hashedPassword });

        const session = this.sessionRepository.create({ user, deviceIp });
        await this.sessionRepository.save(session);

        const payload = { userId: user.id, sessionId: session.id, role: user.role };
        // const token = this.jwtService.sign(payload);
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        await this.userRepository.save(user);
        return { accessToken, refreshToken };
    }

    async login(loginDto: LoginDto, deviceIp: string) {
        const user = await this.userRepository.findOne(
            {
                where: { email: loginDto.email },
                relations: ['role', 'sessions'],
            });
        if (!user || !(await this.validatePassword(loginDto, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const existingSession = user.sessions.find(session => session.deviceIp === deviceIp);
        if (existingSession) {
            const payload = { userId: user.id, sessionId: existingSession.id, role: user.role.name };
            const accessToken = await this.jwtService.signAsync(payload);
            const refreshToken = await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
            });
            return { accessToken, refreshToken };
        }
        const session = this.sessionRepository.create({ user, deviceIp });
        session.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

        await this.sessionRepository.save(session);

        const payload = { userId: user.id, sessionId: session.id, role: user.role.name };
        // const token = this.jwtService.sign(payload);
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        // session.refreshToken = refreshToken;

        await this.sessionRepository.save(session);

        return { accessToken, refreshToken };
    }

    async logout(sessionId: string) {
        return await this.sessionRepository.delete(sessionId);
    }

    async validatePassword(user: LoginDto, password: string) {
        const [salt, storedHash] = password.split('.');
        const hash = (await scrypt(user.password, salt, 32)) as Buffer;
        return storedHash === hash.toString('hex');
    }

    async generatePasswordHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        return salt + '.' + hash.toString('hex');
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken);
            const userId = decoded.userId;
            const session = decoded.session;
            const role = decoded.role;
            const payload = { userId, session, role };

            const newAccessToken = await this.jwtService.signAsync({ payload }, { expiresIn: '1h' });
            return { accessToken: newAccessToken };
        } catch (error) {
            return null;
        }
    }

}