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
  // async getData(
  //   @Res() res: Response,
  // ) {
  //   try {
  //     if (!spreadsheetId) {
  //       return res.status(HttpStatus.BAD_REQUEST).json({
  //         message: 'spreadsheetId и range обязательны для запроса',
  //       });
  //     }

  //     // Получаем данные из Google Sheets через сервис
  //     const data = await this.appointsService.getSheetData(spreadsheetId);

  //     return res.status(HttpStatus.OK).json({
  //       message: 'Данные успешно получены',
  //       data,
  //     });
  //   } catch (error) {
  //     // console.error('Ошибка при получении данных из Google Sheets:', error);
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: 'Не удалось получить данные из Google Sheets',
  //       error: error.message,
  //     });
  //   }
  // }
  @Post()
  async create(
    @Body() createAppointDto: CreateAppointDto
    // @Res() res: Response
  ) {
    return await this.appointsService.createAppoint(createAppointDto);
  }

  @Get()
  async findAll(
    @Res() res: Response
  ) {
    try {
      // Получаем данные из Google Sheets через сервис
      const data = await this.appointsService.findAllAppoints();

      return res.status(HttpStatus.OK).json({
        message: 'Данные успешно получены',
        data,
      });
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
    return await this.appointsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointDto: UpdateAppointDto,
    @Res() res: Response
  ) {
    return await this.appointsService.updateAppoint(id, updateAppointDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    return await this.appointsService.removeAppoint(+id);
  }


}
