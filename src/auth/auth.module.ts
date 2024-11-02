import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/users/user.module';
import { secretKey } from "src/jwt-constants";
import { Session } from 'src/common/entities/session.entity';
import { User } from 'src/common/entities/user.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: secretKey,
            signOptions: { expiresIn: '1d' },
        }),
        TypeOrmModule.forFeature([Session, User]),
        UserModule,
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule { }


// @Module({
//     imports: [
//         JwtModule.register({
//             secret: secretKey, // Используйте переменные окружения
//             signOptions: { expiresIn: '1h' },
//         }),
//         UserModule,
//     ],
//     providers: [AuthService, JwtStrategy],
//     controllers: [AuthController],
// })
// export class AuthModule { }