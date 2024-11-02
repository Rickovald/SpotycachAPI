import { IsAlphanumeric, IsNotEmpty, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { StuffTypes } from '../entities/stuffTypes.entity';
import { Complects } from '../entities/complects.entity';

export class CreateStuffDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;

  @IsNotEmpty()
  price: number;

  complect: Complects;

  @IsNotEmpty()
  type: StuffTypes;
}
export class UpdateStuffDto extends PartialType(CreateStuffDto) { }