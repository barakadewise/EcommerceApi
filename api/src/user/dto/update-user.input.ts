import { CreateUserInput } from './create-user.input';
import { InputType, Field,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  name: string;
  
  @Field()
  email?: string;

  @Field()
  address:string;
}
