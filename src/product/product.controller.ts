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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.create(createProductDto);
    return plainToInstance(ProductResponseDto, product);
  }

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  async findAll(
    @Query() productFiltersDto: ProductFiltersDto,
  ): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll(productFiltersDto);
    return plainToInstance(ProductResponseDto, products);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by id' })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: '4fdbd6e9-f15e-456c-8833-470c092b09c5',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.findOne(id);
    return plainToInstance(ProductResponseDto, product);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.update(id, updateProductDto);
    return plainToInstance(ProductResponseDto, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: '4fdbd6e9-f15e-456c-8833-470c092b09c5',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productService.remove(id);
  }
}
