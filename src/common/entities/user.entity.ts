import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { Role } from "./role.entity";
import { Group } from "./group.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: false, type: 'varchar', nullable: false })
    username: string;

    @Column({ unique: true, type: 'varchar', nullable: false })
    phone: string;
    @Column({ unique: true, type: 'varchar', nullable: true })
    contact: string;
    @Column({ unique: true, type: 'varchar', nullable: true })
    telegram: string;
    @Column({ unique: false, type: 'varchar', nullable: true })
    avatar: string;

    @ManyToOne(() => Role, role => role.id)
    role: Role;

    // @Column({ unique: false, type: 'varchar', nullable: true })
    @OneToMany(() => Session, session => session.user)
    sessions: Session[];

    @ManyToMany(() => Group, group => group.users, { cascade: true })
    @JoinTable() // Указывает TypeORM создать промежуточную таблицу
    group: Group[];
    // @AfterLoad()
    // initializeSessions() {
    //     if (!this.sessions) {
    //         this.sessions = [];
    //     }
    // }
}