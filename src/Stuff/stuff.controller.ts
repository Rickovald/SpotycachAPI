import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { StuffService } from './stuff.service';

@Controller('stuff')
export class StuffController {
  constructor(private readonly stuffService: StuffService) { }

  @Post()
  create(@Body() createStuffDto: CreateStuffDto) {
    return this.stuffService.createStuff(createStuffDto);
  }

  @Get()
  findAll() {
    return this.stuffService.findAllStuff();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStuffDto: UpdateStuffDto) {
    return this.stuffService.updateStuff(+id, updateStuffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffService.removeStuff(+id);
  }
}
