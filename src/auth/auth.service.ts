import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../common/dtos/register.dto';
import { LoginDto } from '../common/dtos/login.dto';
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { Session } from 'src/common/entities/session.entity';
import { User } from 'src/common/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';
import { Group } from 'src/common/entities/group.entity';

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
        console.log(registerDto);

        // Ensure the email is unique
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        // Set default role to 'user'
        const role = await this.userRepository.manager.findOne(Role, { where: { name: 'user' } });
        if (!role) {
            throw new NotFoundException('Default role not found');
        }

        const groups = [];
        if (registerDto.groupNames) {
            for (const groupName of registerDto.groupNames) {
                let group = await this.userRepository.manager.findOne(Group, { where: { name: groupName } });
                if (!group) {
                    console.log('asss');

                    // Если группы нет, создаем ее
                    group = this.userRepository.manager.create(Group, { name: groupName });
                    group = await this.userRepository.manager.save(group);
                }
                groups.push(group);
            }
        }
        console.log(groups);


        const hashedPassword = await this.generatePasswordHash(registerDto.password);
        const user = this.userRepository.create(
            {
                ...registerDto,
                password: hashedPassword,
                role,
                group: groups
            });

        // Save user to database
        await this.userRepository.save(user);

        const payload = {
            userId: user.id,
            userName: user.username,
            groups: user.group,
            phone: user.phone,
            avatar: user.avatar,
            email: user.email,
            role: role
        };

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async login(loginDto: LoginDto, deviceIp: string) {
        const user = await this.userRepository.findOne(
            {
                where: { email: loginDto.email },
                relations: ['role', 'sessions', 'group'],
            });
        if (!user || !(await this.validatePassword(loginDto, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const existingSession = user.sessions.find(session => session.deviceIp === deviceIp);
        if (existingSession) {
            console.log(user);

            const payload = {
                userId: user.id,
                userName: user.username,
                group: user.group,
                phone: user.phone,
                avatar: user.avatar,
                email: user.email,
                role: user.role.name
            };
            const accessToken = await this.jwtService.signAsync(payload);
            const refreshToken = await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
            });
            return { accessToken, refreshToken };
        }
        const session = this.sessionRepository.create({ user, deviceIp });
        session.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

        await this.sessionRepository.save(session);

        const payload = {
            userId: user.id,
            userName: user.username,
            group: user.group,
            phone: user.phone,
            avatar: user.avatar,
            email: user.email,
            role: user.role.name
        };
        // const token = this.jwtService.sign(payload);
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        // session.refreshToken = refreshToken;

        await this.sessionRepository.save(session);
        user.sessions.push(session);
        await this.userRepository.save(user);

        return { accessToken, refreshToken };
    }

    async logout(device: string) {
        const session = await this.sessionRepository.findOne(
            {
                where: { deviceIp: device },
                relations: ['user'],
            });
        if (!session) {
            return null;
        }
        return await this.sessionRepository.delete(session);
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
            const payload = {
                userId: decoded.userId,
                userName: decoded.role,
                group: decoded.userName,
                phone: decoded.group,
                avatar: decoded.phone,
                email: decoded.avatar,
                role: decoded.email
            };

            const newAccessToken = await this.jwtService.signAsync(
                { payload }, { expiresIn: '1h' }
            );
            return { accessToken: newAccessToken };
        } catch (error) {
            return null;
        }
    }

}