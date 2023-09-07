import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartResolver } from './resolvers/cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    ProductsModule,
  ],
  providers: [
    CartResolver,
    CartService
  ]
})
export class CartModule { }
