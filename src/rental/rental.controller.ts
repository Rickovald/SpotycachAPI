import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto, UpdateRentalDto } from 'src/common/dtos/rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.createRental(createRentalDto);
  }

  @Get()
  findAll() {
    return this.rentalService.findAllRental();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.updateRental(id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.removeRental(id);
  }
}
