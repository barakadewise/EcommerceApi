import { InputType, Field, Int } from '@nestjs/graphql';


@InputType()
export class CreateProductInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  total: number;

  @Field()
  cost: number;



}
