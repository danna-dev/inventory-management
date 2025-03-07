import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/product/product.controller';
import { ProductService } from '../../src/product/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFiltersDto,
} from '../../src/product/dto/request';
import { ProductResponseDto } from '../../src/product/dto/response/productResponse.dto';
import { plainToInstance } from 'class-transformer';

// Mock Data
const mockProduct = {
  id: '123',
  name: 'Laptop',
  price: 1000,
} as ProductResponseDto;
const mockProducts = [mockProduct];

// Mock Service
const mockProductService = {
  create: jest.fn().mockResolvedValue(mockProduct),
  findAll: jest.fn().mockResolvedValue(mockProducts),
  findOne: jest.fn().mockResolvedValue(mockProduct),
  update: jest.fn().mockResolvedValue(mockProduct),
  remove: jest.fn().mockResolvedValue('Product was deleted successfully'),
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Laptop',
      price: 1000,
      description: 'A new laptop',
      category: 'Electronics',
      sku: 'SKU123',
    };
    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(plainToInstance(ProductResponseDto, mockProduct));
  });

  it('should return all products', async () => {
    const dto: ProductFiltersDto = {};
    const result = await controller.findAll(dto);

    expect(service.findAll).toHaveBeenCalledWith(dto);
    expect(result).toEqual(plainToInstance(ProductResponseDto, mockProducts));
  });

  it('should return a single product', async () => {
    const result = await controller.findOne('123');

    expect(service.findOne).toHaveBeenCalledWith('123');
    expect(result).toEqual(plainToInstance(ProductResponseDto, mockProduct));
  });

  it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'Updated Laptop' };
    const result = await controller.update('123', dto);

    expect(service.update).toHaveBeenCalledWith('123', dto);
    expect(result).toEqual(plainToInstance(ProductResponseDto, mockProduct));
  });

  it('should delete a product', async () => {
    const result = await controller.remove('123');

    expect(service.remove).toHaveBeenCalledWith('123');
    expect(result).toEqual('Product was deleted successfully');
  });
});
