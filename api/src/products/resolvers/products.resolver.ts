import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';



@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  //crate product resolver
  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }

  //fetch all products resolver
  @Query(() => [Product], { name: 'products' })
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  //fetch specific product  resolver
  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.findOneProduct(id);
  }

  //update the product details
  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<UpdateProductInput> {
    return this.productsService.update(updateProductInput);
  }

  //Delete product
  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.remove(id);
  }




}
