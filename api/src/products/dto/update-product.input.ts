import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field({nullable:true})
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  total?: number;
}
