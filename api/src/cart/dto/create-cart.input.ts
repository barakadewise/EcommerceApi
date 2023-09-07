import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class CreateCartInput {

    @Field({ nullable: false })
    productId: number;

    @Field({ nullable: false })
    quantity: number;

    @Field({ nullable: false })
    userId: number;
}
