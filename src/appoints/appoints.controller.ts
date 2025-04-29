import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppointsService } from './appoints.service';
import { Response } from 'express';
import { CreateAppointDto, UpdateAppointDto } from 'src/common/dtos/appoint.dto';

@Controller('appoints')
export class AppointsController {
  constructor(private readonly appointsService: AppointsService) { }

  @Post()
  async create(
    @Body() createAppointDto: CreateAppointDto,
    @Res() res: Response
  ) {
    console.log('qwe');
    if (
      !createAppointDto.datetimes ||
      createAppointDto.room === null ||
      !createAppointDto.userName
    ) {
      console.log(!createAppointDto.datetimes, createAppointDto.room === null, !createAppointDto.userName);
      
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Некорректные данные',
      });
    }
    try {
      
      const data = await this.appointsService.createAppoint(createAppointDto);

      return res.status(HttpStatus.OK).json({
        message: 'Запись успешно создана',
        data,
      });
    } catch (error) {
      console.log('asd');
      
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Не удалось создать запись',
        error: error.message,
      });
    }
  }

  @Get()
  async findAll(
    @Res() res: Response
  ) {
    try {
      // Получаем данные из Google Sheets через сервис
      const data = await this.appointsService.findAllAppoints();

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      // console.error('Ошибка при получении данных из Google Sheets:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Не удалось получить данные из Google Sheets',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const data = await this.appointsService.findById(id);

    return res.status(HttpStatus.OK).json({
      message: 'Запись успешно получена',
      data,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointDto: UpdateAppointDto,
    @Res() res: Response
  ) {
    const data = await this.appointsService.updateAppoint(id, updateAppointDto);

    return res.status(HttpStatus.OK).json({
      message: 'Запись успешно обновлена',
      data,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const data = await this.appointsService.removeAppoint(id);

    return res.status(HttpStatus.OK).json({
      message: 'Запись успешно удалена',
      data,
    });
  }


}
