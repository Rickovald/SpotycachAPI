import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Rental } from 'src/common/entities/rental.entity';
import { CreateRentalDto, UpdateRentalDto } from 'src/common/dtos/rental.dto';

@Injectable()
export class RentalService {
    /**
     * Here, we have used data mapper approch for this tutorial that is why we
     * injecting repository here. Another approch can be Active records.
     */
    private logger = new Logger(RentalService.name);
    constructor(
        @InjectRepository(Rental)
        private readonly rentalRepository: Repository<Rental>,
    ) { }

    /**
     * this is function is used to create Rental in Rental Entity.
     * @param createRentalDto this will type of createRentalDto in which
     * we have defined what are the keys we are expecting from body
     * @returns promise of rental
     */
    async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
        const rental: Rental = new Rental();
        rental.bookedBy = createRentalDto.bookedBy;
        rental.datetime = createRentalDto.datetime;
        rental.stuff = createRentalDto.stuff;
        return await this.rentalRepository.save(rental);
    }
    /**
     * this function is used to get all the rental's list
     * @returns promise of array of rental
     */
    async findAllRental(): Promise<Rental[]> {
        const data = await this.rentalRepository.find({
            relations: ['stuff', 'bookedBy']
        });
        return data;
    }

    /**
     * this function used to get data of use whose id is passed in parameter
     * @param id is type of number, which represent the id of rental.
     * @returns promise of rental
     */

    async findById(id: string): Promise<Rental> {
        try {
            const rental = await this.rentalRepository.findOne(({
                where: { id: id },
                relations: ['stuff', 'bookedBy'],
            }));
            if (!rental) {
                throw new Error('Intsrument not found.');
            }
            return rental;
        } catch (error) {
            this.logger.log(
                `RentalService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }
    /**
     * this function is used to updated specific rental whose id is passed in
     * parameter along with passed updated data
     * @param id is type of number, which represent the id of rental.
     * @param updateRentalDto this is partial type of createRentalDto.
     * @returns promise of udpate rental
     */
    async updateRental(
        id: string,
        updateRentalDto: UpdateRentalDto,
    ): Promise<Rental> {
        try {
            const rental = await this.findById(id);
            if (!updateRentalDto.bookedBy || !updateRentalDto.datetime) {
                throw new Error('updateRentalDto property is undefined');
            }
            rental.bookedBy = updateRentalDto.bookedBy;
            rental.datetime = updateRentalDto.datetime;
            rental.stuff = updateRentalDto.stuff;
            return await this.rentalRepository.save(rental);
        } catch (error) {
            this.logger.log(
                `RentalService:updateRental: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    /**
     * this function is used to remove or delete rental from database.
     * @param id is the type of number, which represent id of rental
     * @returns nuber of rows deleted or affected
     */
    async removeRental(id: string): Promise<DeleteResult> {
        return await this.rentalRepository.delete(id);
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
