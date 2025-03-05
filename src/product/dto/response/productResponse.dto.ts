import { Exclude, Expose } from "class-transformer";

export class ProductResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    price: number;

    @Expose()
    description: string;

    @Expose()
    category: string;
    
    @Expose()
    sku: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;
}