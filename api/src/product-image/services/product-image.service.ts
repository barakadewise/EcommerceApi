import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { ProductImageDto } from "../dto/product-image-dto";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { ProductImage } from '../entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProductImageService {
    constructor(
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>
    ) { }

    //function to upload image and the product 
    async uploadImage(image: Express.Multer.File, productImageInputDto: ProductImageDto): Promise<ProductImage> {
        try {
            if (!image) {
                throw new BadRequestException('Failed to upload product!');
            }
            console.log(image)
            console.log(productImageInputDto)
            console.log("Successfully Uploaded!");

            const addProductImage = this.productImageRepository.create({
                name: productImageInputDto.name,
                quantity: productImageInputDto.quantity,
                cost: productImageInputDto.cost,
                path: image.path,
                imgUrl: image.filename,
            });
            console.log(addProductImage);
            return await this.productImageRepository.save(addProductImage);

        } catch (error) {
            console.error(error);
            throw new BadRequestException();

        }

    }

    //function to get all product 
    async findAllProduct(): Promise<ProductImage[]> {
        return await this.productImageRepository.find({ order: { createAt: 'DESC' } })
    }



}