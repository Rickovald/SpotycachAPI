import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Session } from 'src/common/entities/session.entity';

@Injectable()
export class SessionCleanerService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) { }

    @Cron('*/10 * * * *') // run every 10 minutes
    async cleanSessions() {
        const expiredSessions = await this.sessionRepository
            .createQueryBuilder('session')
            .where('session.refreshTokenExpiresAt < :now', { now: new Date() })
            .getMany();

        await this.sessionRepository.remove(expiredSessions);
    }
}