import { IsAlphanumeric, IsNotEmpty, MinLength, IsDate } from 'class-validator';
import { User } from '../entities/user.entity';
import { Stuff } from '../entities/stuff.entity';
import { UUID } from 'crypto';

export class CreateAppointDto {
  bookedBy: UUID;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  userName: string;

  datetimes: Date[];

  @IsNotEmpty()
  room: number;

  stuff?: Stuff[];
}

export class UpdateAppointDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  bookedBy: User;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  userName: string;

  @IsDate()
  datetime: Date;

  @IsNotEmpty()
  room: number;

  @IsNotEmpty()
  stuff: Stuff[];
}
