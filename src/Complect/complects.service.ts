import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateComplectsDto } from './dto/create-complects.dto';
import { Complects } from './entities/complects.entity';
import { UpdateComplectsDto } from './dto/update-complects.dto';

@Injectable()
export class ComplectsService {
    /**
     * Here, we have used data mapper approch for this tutorial that is why we
     * injecting repository here. Another approch can be Active records.
     */
    private logger = new Logger(ComplectsService.name);
    constructor(
        @InjectRepository(Complects)
        private readonly compRepository: Repository<Complects>,
    ) { }

    /**
     * this is function is used to create Complect in Complect Entity.
     * @param createCompDto this will type of createComplectDto in which
     * we have defined what are the keys we are expecting from body
     * @returns promise of stuff
     */
    async createComplect(createCompDto: CreateComplectsDto): Promise<Complects> {
        const comp: Complects = new Complects();
        comp.name = createCompDto.name;
        comp.price = createCompDto.price;
        return await this.compRepository.save(comp);
    }

    /**
     * this function is used to get all the stuff's list
     * @returns promise of array of stuff
     */
    async findAllComplects(): Promise<Complects[]> {
        const data = await this.compRepository.find();
        console.log(this.compRepository);

        return data;
    }

    /**
     * this function used to get data of use whose id is passed in parameter
     * @param id is type of number, which represent the id of stuff.
     * @returns promise of stuff
     */

    async findById(id: number): Promise<Complects> {
        try {
            const data = await this.compRepository.findOneBy({ id });
            if (!data) {
                throw new Error('Complect not found.');
            }
            return data;
        } catch (error) {
            this.logger.log(
                `ComplectService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }
    /**
     * this function is used to updated specific stuff whose id is passed in
     * parameter along with passed updated data
     * @param id is type of number, which represent the id of stuff.
     * @param updateComplectDto this is partial type of createComplectDto.
     * @returns promise of udpate stuff
     */
    async updateComplect(
        id: number,
        updateComplectDto: UpdateComplectsDto,
    ): Promise<Complects> {
        try {
            const stuff: Complects = new Complects();
            if (!updateComplectDto.name || !updateComplectDto.price) {
                throw new Error('updateComplectDto property is undefined');
            }
            stuff.name = updateComplectDto.name;
            stuff.price = updateComplectDto.price;
            stuff.id = id;
            return await this.compRepository.save(stuff);
        } catch (error) {
            this.logger.log(
                `ComplectService:updateComplect: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    /**
     * this function is used to remove or delete stuff from database.
     * @param id is the type of number, which represent id of stuff
     * @returns nuber of rows deleted or affected
     */
    async removeComplect(id: number): Promise<DeleteResult> {
        return await this.compRepository.delete(id);
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
