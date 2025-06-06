import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from '../common/dtos/group.dto';
import { GroupService } from './groups.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.createGroup(createGroupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('userId') userId: string | null) {
    return await this.groupService.findAllGroup(userId);
  }
  @Get('reg')
  async findAllNames() {
    return await this.groupService.findAllNames();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.groupService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return await this.groupService.updateGroup(id, updateGroupDto);
  }
  @Post('add-user')
  async addUserToGroup(@Body() body: { groupId: string; userId: string; }) {
    return await this.groupService.addUserToGroup(body.groupId, body.userId);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.groupService.removeGroup(id);
  }
}
