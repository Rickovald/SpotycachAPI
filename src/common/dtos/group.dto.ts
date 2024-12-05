import { ArrayMinSize, IsAlphanumeric, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateGroupDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;

}
export class UpdateGroupDto extends PartialType(CreateGroupDto) {

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true }) // Каждая группа — строка
  users: User[];
}