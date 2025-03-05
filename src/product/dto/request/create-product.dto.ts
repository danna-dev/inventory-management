
import { IsEnum, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { ProductCategory } from "../../constants";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsEnum(ProductCategory, { message: 'Invalid category' })
    category: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @MinLength(3)
    sku: string;
}
