import { IsAlphanumeric, IsNotEmpty, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGroupDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;

}
export class UpdateGroupDto extends PartialType(CreateGroupDto) { }