import { Module } from '@nestjs/common';
import { AppointsService } from './appoints.service';
import { AppointsController } from './appoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoints } from '../common/entities/appoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appoints])],
  controllers: [AppointsController],
  providers: [AppointsService],
  exports: [AppointsService, TypeOrmModule],
})
export class AppointsModule { }
