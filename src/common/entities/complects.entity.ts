import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Stuff } from './stuff.entity';

@Entity()
export class Complects {
    /**
     * this decorator will help to auto generate id for the table.
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'integer', nullable: false })
    price: number;

    @OneToMany(() => Stuff, stuff => stuff.complect)
    stuff: Stuff[];
}