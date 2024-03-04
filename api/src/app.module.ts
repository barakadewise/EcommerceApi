import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProductImageModule } from './product-image/product-image.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'LUKUMAY',
      database: 'Ecommerce_db',
      autoLoadEntities: true,
      synchronize: true,
      

    }),
  
    UserModule,
    ProductsModule,
    CartModule,
    AuthModule,
    ProductImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
