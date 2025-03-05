import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ProductCategory } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Lettuce', description: 'Product name' })
  name: string;

  @IsString()
  @MinLength(10)
  @ApiProperty({ example: 'Vegetable', description: 'Product description' })
  description: string;

  @IsEnum(ProductCategory, { message: 'Invalid category' })
  @ApiProperty({ example: 'food', description: 'Product category' })
  category: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 10, description: 'Product price' })
  price: number;

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'SKU123', description: 'Product SKU' })
  sku: string;
}
