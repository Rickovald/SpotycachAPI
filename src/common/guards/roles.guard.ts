import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // Если нет ролей, доступ разрешён
        }

        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['role', 'sessions'],
        });
        // Проверка наличия необходимых ролей у пользователя;
        const hasRole = () => requiredRoles.includes(user.role.name);
        if (!user || !hasRole()) {
            throw new ForbiddenException('Forbidden');
        }
        return true;
    }
}
