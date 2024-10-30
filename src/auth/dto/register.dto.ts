import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Session } from '../entities/session.entity';

export class RegisterDto {
    @IsString()
    @MinLength(8)
    @MaxLength(60)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    password: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    phone: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    contact: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    telegram: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    avatar: string;

    @IsNotEmpty()
    role: DeepPartial<Role>;; // простая роль

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    sessions: DeepPartial<Session[]>;
}