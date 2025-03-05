import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ProductCategory } from "../../constants";

export class ProductFiltersDto extends PartialType(PaginationDto) {
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    minPrice?: number;

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    maxPrice?: number;

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    minStock?: number;

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    maxStock?: number;

    @IsOptional()
    @IsEnum( ProductCategory)
    category?: string;
}