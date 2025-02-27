import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto, ProductFiltersDto, UpdateProductDto } from './dto/request';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create( createProductDto )
      await this.productRepository.save(product)

      return product;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll( productFiltersDto : ProductFiltersDto ): Promise<Product[]> {
    const { limit = 10, page = 1 } = productFiltersDto;

    const products = await this.productRepository.find({
			take: limit,
			skip: (page - 1) * limit,
		});

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    product.id

    if( !product ) throw new BadRequestException(`Product with id ${id} not found`)

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto
    })

    if( !product ) throw new BadRequestException(`Product with id ${id} not found`)

    return await this.productRepository.save( product )
  }

  async remove(id: string): Promise<string> {
    const product = await this.findOne( id )
		await this.productRepository.remove(product)
    return `Product was deleted successfully`;
  }

  private handleDBExceptions( error: any ){
		if( error.code === '23505'){
			throw new BadRequestException(error.detail);
		}

		this.logger.error(error)
		throw new InternalServerErrorException('unexpected error, check server logs')
	}
}
