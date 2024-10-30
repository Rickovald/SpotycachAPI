import { AfterLoad, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { Role } from "./role.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: false, type: 'varchar', nullable: false })
    username: string;

    @Column({ unique: true, type: 'varchar', nullable: false })
    phone: string;
    @Column({ unique: true, type: 'varchar', nullable: false })
    contact: string;
    @Column({ unique: true, type: 'varchar', nullable: false })
    telegram: string;
    @Column({ unique: false, type: 'varchar', nullable: false })
    avatar: string;

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    @Column({ unique: false, type: 'varchar', nullable: true })
    @OneToMany(() => Session, session => session.user)
    sessions: Session[];

    @AfterLoad()
    initializeSessions() {
        if (!this.sessions) {
            this.sessions = [];
        }
    }
}