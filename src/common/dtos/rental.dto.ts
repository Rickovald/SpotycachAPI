import { IsAlphanumeric, IsNotEmpty, MinLength, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Stuff } from '../entities/stuff.entity';
import { User } from '../entities/user.entity';

export class CreateRentalDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  bookedBy: User;

  @IsDate()
  datetime: Date;

  @IsNotEmpty()
  stuff: Stuff[];
}

export class UpdateRentalDto extends PartialType(CreateRentalDto) { }
