import { IsAlphanumeric, IsNotEmpty, MinLength, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { Stuff } from '../entities/stuff.entity';

export class CreateAppointDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  bookedBy: User;

  @IsDate()
  datetime: Date;

  @IsNotEmpty()
  room: number;

  @IsNotEmpty()
  stuff: Stuff[];
}

export class UpdateAppointDto extends PartialType(CreateAppointDto) { }
