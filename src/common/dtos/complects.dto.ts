import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateComplectsDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must have atleast 3 characters.' })
    @IsAlphanumeric(undefined, {
        message: 'Name does not allow other than alpha numeric chars.',
    })
    name: string;

    @IsNotEmpty()
    price: number;
}

export class UpdateComplectsDto extends PartialType(CreateComplectsDto) { }
