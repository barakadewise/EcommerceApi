import { Body, Controller, Get, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductImageDto } from '../dto/product-image-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductImageService } from '../services/product-image.service';
import { ApiResponse } from '@nestjs/swagger';
import { ProductImage } from '../entities/product-image.entity';

export const storage = {

    storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
            const fileExtension = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
            callback(null, filename);
        }
    })
}

@Controller('product-image-controller')
export class ProductImageController {
    constructor(
        private readonly productImageService: ProductImageService
    ) { }

    //End point for product and image upload
    @Post('product')
    @ApiResponse({ status: 201, description: 'File uploaded successfully' })
    @ApiResponse({ status: 400, description: 'Invalid file type. Only JPG files are allowed' })
    @UseInterceptors(FileInterceptor('image', storage))

    async uploadFile(
        @Body() productImageInputDto: ProductImageDto,
        @UploadedFile(
            new ParseFilePipeBuilder().addFileTypeValidator({
                fileType: 'jpeg',
            }).build()
        ) image: Express.Multer.File,
    ): Promise<ProductImageDto> {
        return this.productImageService.uploadImage(image, productImageInputDto);

    }

    //return the list of all products
    @Get('products')
    async findAllProducts():Promise<ProductImage[]>{
        return (await this.productImageService.findAllProduct());
    }

}
