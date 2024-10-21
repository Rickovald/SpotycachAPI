import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "src/utils/strategy/local.strategy";
import { User } from "src/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
