import { Controller, Get, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne(id);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    // @Put(':id')
    // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(id, updateUserDto);
    // }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
}