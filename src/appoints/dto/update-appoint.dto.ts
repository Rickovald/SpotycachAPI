import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointDto } from './create-appoint.dto';

export class UpdateAppointDto extends PartialType(CreateAppointDto) {}
