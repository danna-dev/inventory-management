import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFiltersDto,
} from './dto/request';
import { plainToInstance } from 'class-transformer';
import { ProductResponseDto } from './dto/response/productResponse.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.create(createProductDto);
    return plainToInstance(ProductResponseDto, product);
  }

  @Get()
  async findAll(
    @Query() productFiltersDto: ProductFiltersDto,
  ): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll(productFiltersDto);
    return plainToInstance(ProductResponseDto, products);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.findOne(id);
    return plainToInstance(ProductResponseDto, product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.update(id, updateProductDto);
    return plainToInstance(ProductResponseDto, product);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productService.remove(id);
  }
}
