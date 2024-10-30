import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';
import { Appoints, Schedule } from './entities/appoint.entity';

@Injectable()
export class AppointsService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  private logger = new Logger(AppointsService.name);
  constructor(
    @InjectRepository(Appoints)
    private readonly appointsRepository: Repository<Appoints>,
  ) { }

  /**
   * this is function is used to create Appoint in Appoint Entity.
   * @param createAppointDto this will type of createAppointDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of appoint
   */
  async createAppoint(createAppointDto: CreateAppointDto): Promise<Appoints> {
    const appoint: Appoints = new Appoints();
    appoint.booked = createAppointDto.booked;
    appoint.datetime = createAppointDto.datetime;
    return await this.appointsRepository.save(appoint);
  }

  /**
   * this function is used to get all the appoint's list
   * @returns promise of array of appoints
   */

  async findAllAppoints(): Promise<Schedule[]> {
    const data = await this.appointsRepository.find();
    const result: Schedule[] = [];
    let monday = '';
    let id = 0;
    const weekDaysNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    data.forEach((element) => {
      const date = new Date(element.datetime);
      const dayOfWeek = date.getDay();
      const datePart = date.toISOString().slice(0, 10);
      if (dayOfWeek === 1 && monday !== datePart) {
        monday = datePart;
        result.push({
          id: id,
          week: monday,
          slots: {},
        });
        id++;
      }
      if (!result[id - 1].slots[weekDaysNames[dayOfWeek]]) {
        result[id - 1].slots[weekDaysNames[dayOfWeek]] = []; // Инициализируем пустой массив, если свойство не существует
      }

      result[id - 1].slots[`${weekDaysNames[dayOfWeek]}`].push(element);
    });

    return result;
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of appoint.
   * @returns promise of appoint
   */

  async findById(id: number): Promise<Appoints> {
    try {
      const user = await this.appointsRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `AppointsService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }
  /**
   * this function is used to updated specific appoint whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of appoint.
   * @param updateAppointDto this is partial type of createAppointDto.
   * @returns promise of udpate appoint
   */
  async updateAppoint(
    id: number,
    updateAppointDto: UpdateAppointDto,
  ): Promise<Appoints> {
    try {
      const appoint: Appoints = new Appoints();
      if (!updateAppointDto.datetime || !updateAppointDto.booked) {
        throw new Error('updateAppointDto property is undefined');
      }
      appoint.booked = updateAppointDto.booked;
      appoint.datetime = updateAppointDto.datetime;
      appoint.id = id;
      return await this.appointsRepository.save(appoint);
    } catch (error) {
      this.logger.log(
        `AppointsService:updateAppoint: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  /**
   * this function is used to remove or delete appoint from database.
   * @param id is the type of number, which represent id of appoint
   * @returns nuber of rows deleted or affected
   */
  async removeAppoint(id: number): Promise<DeleteResult> {
    return await this.appointsRepository.delete(id);
  }
}

// function getStartAndEndOfWeek(mondayDate: string) {
//   const startDate = new Date(mondayDate);
//   startDate.setHours(0, 0, 0, 0); // Устанавливаем время начала недели на 00:00:00
//   const endDate = new Date(startDate);
//   endDate.setDate(endDate.getDate() + 6); // Добавляем 6 дней для получения конца недели
//   endDate.setHours(23, 59, 59, 999); // Устанавливаем время конца недели на 23:59:59
//   return { start: startDate, end: endDate };
// }
