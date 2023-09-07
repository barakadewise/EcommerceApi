import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';

@ObjectType()
@Entity('products')
export class Product {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Int, { nullable: false })
  @Column({ nullable: false })
  total: number;

  @Field()
  @Column({ nullable: true })
  cost: number;

  @Field(() => [Cart], { nullable: true })
  @OneToMany(() => Cart, (cart) => cart.product)
  @JoinColumn()
  cart: Cart[];

  @Field()
  @CreateDateColumn()
  addedAt: Date;
}
