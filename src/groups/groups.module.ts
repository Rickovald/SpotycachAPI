import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, } from '../common/entities/group.entity';
import { GroupController } from './groups.controller';
import { GroupService } from './groups.service';
@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule { }
