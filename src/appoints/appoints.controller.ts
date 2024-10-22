import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointsService } from './appoints.service';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';

@Controller('appoints')
export class AppointsController {
  constructor(private readonly appointsService: AppointsService) {}

  @Post()
  create(@Body() createAppointDto: CreateAppointDto) {
    return this.appointsService.createAppoint(createAppointDto);
  }

  @Get()
  findAll() {
    return this.appointsService.findAllAppoints();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointDto: UpdateAppointDto) {
    return this.appointsService.updateAppoint(+id, updateAppointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointsService.removeAppoint(+id);
  }
}
