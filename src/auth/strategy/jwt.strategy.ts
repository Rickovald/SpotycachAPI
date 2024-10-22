
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { secretKey } from "src/jwt-constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        });
    }

    validate(payload: { sub: string, email: string; }) {
        return { id: payload.sub, email: payload.email };
    }
}