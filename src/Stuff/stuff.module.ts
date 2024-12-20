import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stuff, } from '../common/entities/stuff.entity';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
@Module({
  imports: [TypeOrmModule.forFeature([Stuff])],
  controllers: [StuffController],
  providers: [StuffService],
  exports: [StuffService],
})
export class StuffModule { }
