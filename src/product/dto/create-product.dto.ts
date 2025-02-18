import { Transform } from "class-transformer";
import { IsDecimal, IsIn, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsIn(['Personal care', 'Food', 'Cleaninin supplies'])
    category: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @MinLength(3)
    sku: string;
}
