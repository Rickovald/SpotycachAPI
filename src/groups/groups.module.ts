import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, } from '../common/entities/group.entity';
import { GroupController } from './groups.controller';
import { GroupService } from './groups.service';
import { User } from 'src/common/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule { }
