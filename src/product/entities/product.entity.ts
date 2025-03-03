

import { AbstractEntity } from "../../common/entities/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'products'})
export class Product extends AbstractEntity{
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    category: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'text', unique: true })
    sku: string;
}
