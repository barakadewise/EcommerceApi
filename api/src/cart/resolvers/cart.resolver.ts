import { Resolver, Query, Mutation, Args, Int, } from '@nestjs/graphql';
import { CartService } from '../services/cart.service';
import { Cart } from '../entities/cart.entity';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.inputs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';


@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) { }

  // create cart function
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Cart)
  async createCart(@Args('createCartInput') createCartInput: CreateCartInput): Promise<Cart> {
    return this.cartService.createCart(createCartInput);
  }

  //fetch all carts function
  @Query(() => [Cart], { name: 'carts' })
  async findAllCarts(): Promise<Cart[]> {
    return this.cartService.findAllCarts()

  }
  //find one cart by id
  @Query(() => Cart, { name: 'cart' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  //upddate cart function
  @Mutation(() => Cart)
  async updateCart(@Args('updateCart') updateCart: UpdateCartInput): Promise<UpdateCartInput> {
    return this.cartService.updateCart(updateCart);

  }

  //delete cart function
  @Mutation(() => Cart)
  async removeCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }
}
