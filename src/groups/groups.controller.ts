import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from '../common/dtos/group.dto';
import { GroupService } from './groups.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAllGroup();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

    // return this.groupService.removeGroup(id);
  }
}
