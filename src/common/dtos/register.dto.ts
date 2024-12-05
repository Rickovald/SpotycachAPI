import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, Matches, IsOptional, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Session } from '../entities/session.entity';

export class RegisterDto {
    @IsString()
    @MinLength(4)
    @MaxLength(60)
    username: string;

    @IsString()
    @Matches(/@/)
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

    @MaxLength(60)
    @IsOptional()
    contact?: string;

    @MaxLength(60)
    @IsOptional()
    telegram?: string;

    @MaxLength(60)
    @IsOptional()
    avatar?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @ArrayMaxSize(10) // Ограничение на количество групп
    @IsString({ each: true }) // Каждая группа — строка
    groupNames?: string[];
}
