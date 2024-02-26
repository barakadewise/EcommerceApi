import { Module } from '@nestjs/common';
import { ProductImageController } from './product-image-controller/product-image-controller';
import { ProductImageService } from './services/product-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
  controllers: [ProductImageController]
})
export class ProductImageModule { }
