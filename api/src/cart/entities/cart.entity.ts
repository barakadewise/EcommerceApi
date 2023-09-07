import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('carts')
export class Cart {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  productName: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  quantity: number;

  @Field({nullable:true})
  @Column({ nullable: true })
  unitCost: number;

  @Field({nullable:false})
  @Column({ nullable: true })
  totalCost: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: true })
  userId: number;

  @Field(() => Int)
  @Column({ nullable: false })
  productId: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.cart, { onDelete: 'CASCADE', eager: true })
  product: Product;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE', eager: true })
  user: User;

  @Field()
  @CreateDateColumn()
  addedAt: Date;

}
