import { IsAlphanumeric, IsNotEmpty, MinLength, IsDate } from 'class-validator';

export class CreateStuffDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;

  @IsNotEmpty()
  price: number;

  complect: number;

  @IsNotEmpty()
  type: number;
}
