import { PartialType } from '@nestjs/mapped-types';
import { CreateComplectsDto } from './create-complects.dto';

export class UpdateComplectsDto extends PartialType(CreateComplectsDto) { }
