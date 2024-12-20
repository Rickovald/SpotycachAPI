import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { secretKey } from "src/jwt-constants";

interface JwtPayload {
    userId: number;
    userName: string;
    group: string;
    phone: string;
    avatar: string;
    email: string;
    role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
        });
    }


    async validate(payload: JwtPayload) {
        return {
            userId: payload.userId,
            userName: payload.role,
            group: payload.userName,
            phone: payload.group,
            avatar: payload.phone,
            email: payload.avatar,
            role: payload.email
        };
    }
}