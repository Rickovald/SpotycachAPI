import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "src/common/entities/user.entity";
import { Role } from "src/common/entities/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }