import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ Product ])
  ]
})
export class ProductModule {}
