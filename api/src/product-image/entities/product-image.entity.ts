
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('productss')
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    quantity: number;

    @Column({nullable:false})
    cost: number;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    imgUrl: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;


}
