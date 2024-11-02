import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffTypesService } from './stuffTypes.service';
import { StuffTypesController } from './stuffTypes.controller';
import { StuffTypes } from 'src/common/entities/stuffTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StuffTypes])],
  controllers: [StuffTypesController],
  providers: [StuffTypesService],
  exports: [StuffTypesService],
})
export class StuffTypesModule { }
