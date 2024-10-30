import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/auth/entities/role.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: ['role'] });
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async create(createUserDto: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        await this.userRepository.save(user);

        // Добавление ролей

        const role = await this.roleRepository.findOneBy({ id: 0 });
        user.role = role;
        return this.userRepository.save(user);
    }

    // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    //     const user = await this.findOne(id);
    //     if (!user) throw new Error('User not found');

    //     if (updateUserDto.password) {
    //         user.password = await bcrypt.hash(updateUserDto.password, 10);
    //     }
    //     Object.assign(user, updateUserDto);

    //     // Обновление ролей
    //     if (updateUserDto.roles) {
    //         const roles = await Promise.all(
    //             updateUserDto.roles.map(roleName => this.createOrFindRole(roleName, user)),
    //         );
    //         user.roles = roles;
    //     }

    //     return this.userRepository.save(user);
    // }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    // private async createOrFindRole(roleName: string, user: User): Promise<Role> {
    //     let role = await this.roleRepository.findOne({ where: { name: roleName, user } });
    //     if (!role) {
    //         role = this.roleRepository.create({ name: roleName, user });
    //         await this.roleRepository.save(role);
    //     }
    //     return role;
    // }
}
