import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from './dto/request';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  findAll( 
    @Query() productFiltersDto: ProductFiltersDto
  ) {
    return this.productService.findAll( productFiltersDto );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productService.remove(id);
  }
}
