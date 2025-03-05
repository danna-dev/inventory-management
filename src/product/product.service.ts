import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  CreateProductDto,
  ProductFiltersDto,
  UpdateProductDto,
} from './dto/request';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(productFiltersDto: ProductFiltersDto): Promise<Product[]> {
    const { limit = 10, page = 1, ...filter } = productFiltersDto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filter.category)
      queryBuilder.andWhere('product.category = :category', {
        category: filter.category,
      });

    if (filter.minPrice)
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: filter.minPrice,
      });

    if (filter.maxPrice)
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: filter.maxPrice,
      });

    queryBuilder.skip((page - 1) * limit).take(limit);

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    product.id;

    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<string> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return `Product was deleted successfully`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'unexpected error, check server logs',
    );
  }
}
