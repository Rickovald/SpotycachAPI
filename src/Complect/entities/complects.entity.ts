import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Complects {
    /**
     * this decorator will help to auto generate id for the table.
     */
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'integer', nullable: false })
    price: number;
}