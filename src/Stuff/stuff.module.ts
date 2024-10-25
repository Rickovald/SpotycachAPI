import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stuff } from './entities/stuff.entity';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stuff])],
  controllers: [StuffController],
  providers: [StuffService],
  exports: [StuffService, TypeOrmModule],
})
export class StuffModule { }
