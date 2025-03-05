import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductCategory } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class ProductFiltersDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 10, description: 'Minimum price' })
  minPrice?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 100, description: 'Maximum price' })
  maxPrice?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 10, description: 'Minimum stock' })
  minStock?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ example: 100, description: 'Maximum stock' })
  maxStock?: number;

  @IsOptional()
  @IsEnum(ProductCategory)
  @ApiProperty({ example: 'food', description: 'Product category' })
  category?: string;
}
