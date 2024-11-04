import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from '../common/dtos/group.dto';
import { Group } from '../common/entities/group.entity';

@Injectable()
export class GroupService {
    /**
     * Here, we have used data mapper approch for this tutorial that is why we
     * injecting repository here. Another approch can be Active records.
     */
    private logger = new Logger(GroupService.name);
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }

    /**
     * this is function is used to create Group in Group Entity.
     * @param createGroupDto this will type of createGroupDto in which
     * we have defined what are the keys we are expecting from body
     * @returns promise of group
     */
    async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
        const group: Group = new Group();
        group.name = createGroupDto.name;
        return await this.groupRepository.save(group);
    }
    /**
     * this function is used to get all the group's list
     * @returns promise of array of group
     */
    async findAllGroup(): Promise<Group[]> {
        const data = await this.groupRepository.find({
            relations: ['user'],
        });
        return data;
    }

    /**
     * this function used to get data of use whose id is passed in parameter
     * @param id is type of number, which represent the id of group.
     * @returns promise of group
     */

    async findById(id: string): Promise<Group> {
        try {
            const user = await this.groupRepository.findOne({
                where: { id: id },
                relations: ['user'],
            });
            if (!user) {
                throw new Error('Group not found.');
            }
            return user;
        } catch (error) {
            this.logger.log(
                `GroupService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }
    /**
     * this function is used to updated specific group whose id is passed in
     * parameter along with passed updated data
     * @param id is type of number, which represent the id of group.
     * @param updateGroupDto this is partial type of createGroupDto.
     * @returns promise of udpate group
     */
    async updateGroup(
        id: string,
        updateGroupDto: UpdateGroupDto,
    ): Promise<Group> {
        try {
            const group = await this.findById(id);
            if (!updateGroupDto.name) {
                throw new Error('updateGroupDto property is undefined');
            }
            group.name = updateGroupDto.name;
            return await this.groupRepository.save(group);
        } catch (error) {
            this.logger.log(
                `GroupService:updateGroup: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    /**
     * this function is used to remove or delete group from database.
     * @param id is the type of number, which represent id of group
     * @returns nuber of rows deleted or affected
     */
    async removeGroup(id: string): Promise<DeleteResult> {
        return await this.groupRepository.delete(id);
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
