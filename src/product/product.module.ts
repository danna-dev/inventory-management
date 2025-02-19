import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    ConfigModule
  ]
})
export class ProductModule {}
