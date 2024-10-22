import { IsAlphanumeric, IsNotEmpty, MinLength, IsDate } from 'class-validator';

export class CreateAppointDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  booked: string;

  @IsDate()
  datetime: Date;
}
