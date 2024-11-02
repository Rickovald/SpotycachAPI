import { IsAlphanumeric, IsNotEmpty, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateStuffTypesDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;
}
export class UpdateStuffTypesDto extends PartialType(CreateStuffTypesDto) { }
