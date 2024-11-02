import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplectsService } from './complects.service';
import { ComplectsController } from './complects.controller';
import { Complects } from '../common/entities/complects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complects])],
  controllers: [ComplectsController],
  providers: [ComplectsService],
  exports: [ComplectsService, TypeOrmModule],
})
export class ComplectModule { }
