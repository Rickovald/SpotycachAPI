import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateStuffTypesDto, UpdateStuffTypesDto } from '../common/dtos/stuffTypes.dto';
import { StuffTypesService } from './stuffTypes.service';

@Controller('stuff-types')
export class StuffTypesController {
  constructor(private readonly stuffTypesService: StuffTypesService) { }

  @Post()
  create(@Body() createStuffDto: CreateStuffTypesDto) {
    return this.stuffTypesService.createStuff(createStuffDto);
  }

  @Get()
  findAll() {
    return this.stuffTypesService.findAllStuff();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffTypesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStuffDto: UpdateStuffTypesDto) {
    return this.stuffTypesService.updateStuff(id, updateStuffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffTypesService.removeStuff(id);
  }
}
