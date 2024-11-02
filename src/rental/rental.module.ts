import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { Rental } from 'src/common/entities/rental.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule { }
