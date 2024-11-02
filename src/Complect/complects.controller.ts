import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateComplectsDto, UpdateComplectsDto } from '../common/dtos/complects.dto';
import { ComplectsService } from './complects.service';

@Controller('complects')
export class ComplectsController {
  constructor(private readonly complectService: ComplectsService) { }

  @Post()
  create(@Body() createComplectDto: CreateComplectsDto) {
    return this.complectService.createComplect(createComplectDto);
  }

  @Get()
  findAll() {
    return this.complectService.findAllComplects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complectService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplectDto: UpdateComplectsDto) {
    return this.complectService.updateComplect(id, updateComplectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complectService.removeComplect(+id);
  }
}
