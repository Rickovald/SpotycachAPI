import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    deviceIp: string;

    @Column()
    refreshTokenExpiresAt: Date;

    @ManyToOne(() => User, user => user.sessions)
    @JoinColumn({ name: 'userId' })
    user: User;

    // @Column({ unique: true, type: 'varchar', nullable: false })
    // refreshToken: string;
}