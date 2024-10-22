import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "src/auth/strategy/local.strategy";
import { User } from "src/auth/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { secretKey } from "src/jwt-constants";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: secretKey,
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }