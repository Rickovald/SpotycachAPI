import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { StuffTypes } from 'src/common/entities/stuffTypes.entity';
import { CreateStuffTypesDto, UpdateStuffTypesDto } from 'src/common/dtos/stuffTypes.dto';

@Injectable()
export class StuffTypesService {
    /**
     * Here, we have used data mapper approch for this tutorial that is why we
     * injecting repository here. Another approch can be Active records.
     */
    private logger = new Logger(StuffTypesService.name);
    constructor(
        @InjectRepository(StuffTypes)
        private readonly stuffRepository: Repository<StuffTypes>,
    ) { }

    /**
     * this is function is used to create Stuff in Stuff Entity.
     * @param createStuffDto this will type of createStuffDto in which
     * we have defined what are the keys we are expecting from body
     * @returns promise of stuff
     */
    async createStuff(createStuffDto: CreateStuffTypesDto): Promise<StuffTypes> {
        const stuff: StuffTypes = new StuffTypes();
        stuff.name = createStuffDto.name;
        return await this.stuffRepository.save(stuff);
    }
    /**
     * this function is used to get all the stuff's list
     * @returns promise of array of stuff
     */
    async findAllStuff(): Promise<StuffTypes[]> {
        const data = await this.stuffRepository.find();
        return data;
    }

    /**
     * this function used to get data of use whose id is passed in parameter
     * @param id is type of number, which represent the id of stuff.
     * @returns promise of stuff
     */

    async findById(id: number): Promise<StuffTypes> {
        try {
            const stuff = await this.stuffRepository.findOne({
                where: { id: id },
                relations: ['stuff'],
            });
            if (!stuff) {
                throw new Error('Type not found.');
            }
            return stuff;
        } catch (error) {
            this.logger.log(
                `StuffService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }
    /**
     * this function is used to updated specific stuff whose id is passed in
     * parameter along with passed updated data
     * @param id is type of number, which represent the id of stuff.
     * @param updateStuffDto this is partial type of createStuffDto.
     * @returns promise of udpate stuff
     */
    async updateStuff(
        id: number,
        updateStuffDto: UpdateStuffTypesDto,
    ): Promise<StuffTypes> {
        try {
            const stuff = await this.findById(id);
            if (!updateStuffDto.name) {
                throw new Error('updateStuffDto property is undefined');
            }
            stuff.name = updateStuffDto.name;
            return await this.stuffRepository.save(stuff);
        } catch (error) {
            this.logger.log(
                `StuffService:updateStuff: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    /**
     * this function is used to remove or delete stuff from database.
     * @param id is the type of number, which represent id of stuff
     * @returns nuber of rows deleted or affected
     */
    async removeStuff(id: string): Promise<DeleteResult> {
        return await this.stuffRepository.delete(id);
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
