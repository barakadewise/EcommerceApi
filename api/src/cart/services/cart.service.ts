import { Injectable } from '@nestjs/common';
import { CreateCartInput } from '../dto/create-cart.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { UpdateCartInput } from '../dto/update-cart.inputs';
import { ProductsService } from 'src/products/services/products.service';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductsService
  ) { }

  //create cart function //
  async createCart(input: CreateCartInput): Promise<Cart> {
    const product = await this.productService.findOneProduct(input.productId)
    
    const productExistInCart = await this.cartRepository.findOne({
      where: {
        productId: input.productId,
        userId: input.userId
      }
    })

    //check if cart exist if exist update 
    if (productExistInCart) {
      productExistInCart.quantity = input.quantity;
      productExistInCart.unitCost = product.cost;
      productExistInCart.totalCost = product.cost * productExistInCart.quantity;
      await this.cartRepository.save(productExistInCart);
      return productExistInCart;
    }

    //create  new record if not exist
    const newCart = this.cartRepository.create(input)
    newCart.totalCost = product.cost * newCart.quantity;
    newCart.unitCost = product.cost;
    newCart.productName = product.name;
    return this.cartRepository.save(newCart);
  }

  //update cart  function
  async updateCart(updateCartInput: UpdateCartInput): Promise<UpdateCartInput> {
    const getCart = await this.cartRepository.findOne({ where: { id: updateCartInput.id } })
    const getProduct = await this.productService.findOneProduct(getCart.productId)
    getCart.totalCost = getProduct.cost * updateCartInput.quantity;
    await this.cartRepository.save(getCart);
    await this.cartRepository.update(updateCartInput.id, updateCartInput);
    return updateCartInput;
    

  }

  //fetch all carts function
  async findAllCarts(): Promise<Cart[]> {
    return this.cartRepository.find({order:{addedAt:'DESC'}})

  }

  //find cart by its id
  async findOne(id: number) {
    return this.cartRepository.findOne({where:{id:id}})
  }


  //delete cart by its id
  async remove(id: number) {
    return this.cartRepository
  }
}
