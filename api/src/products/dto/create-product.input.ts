import { InputType, Field, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateProductInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  total: number;
  
  @Field(()=>Int)
  cost:number;

}
