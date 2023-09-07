import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, nullable: false })
  name: string;

  @Field()
  @Column({ unique: true, nullable: false })
  email: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(()=>[Cart],{ nullable: true })
  @OneToMany(() => Cart, (cart) => cart.user)
  @JoinColumn()
  carts: Cart[]
}
