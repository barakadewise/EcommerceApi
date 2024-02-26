import { Injectable, UploadedFile } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';




@Injectable()
export class ProductsService {
  constructor(
  
  @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  //create products funtion
  async createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const productExist = await this.productRepository.findOne({ where: { name: createProductInput.name } })
    if (productExist) {
      throw new BadRequestException(`Product ${productExist.name} Alraedy Exist!`)
    }
    const addProduct = this.productRepository.create(createProductInput)
    return this.productRepository.save(addProduct)

  }

  //query all the products fuction
  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find()
  }

  //query one product function
  async findOneProduct(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id: id } })
  }
  //update product function
  async update(updateProductInput: UpdateProductInput): Promise<UpdateProductInput> {
    const produtExist = await this.productRepository.findOne({ where: { id: updateProductInput.id } })
    try {
      if (!produtExist) {
        throw new BadRequestException('Product not found!..')
      }
      await this.productRepository.update(produtExist.id, updateProductInput)
      return updateProductInput;
    } catch (error) {
      throw error;

    }

  }



  

  //remove product 
  async remove(id: number): Promise<Product> {
    const deleteProduct = await this.productRepository.findOne({ where: { id: id } })
    try {
      if (!deleteProduct) {
        throw new BadRequestException('Product not found!..')
      }
      await this.productRepository.delete(deleteProduct.id)
      return deleteProduct

    } catch (err) {
      throw err;
    }
  }
}
