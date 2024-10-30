import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "src/auth/entities/user.entity";
import { UserService } from "./user.service";
import { Role } from "src/auth/entities/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }