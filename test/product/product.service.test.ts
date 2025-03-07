import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { ProductService } from '../../src/product/product.service';
import { Product } from '../../src/product/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../src/product/dto/request';

const mockProduct = {
  id: '1',
  name: 'Laptop',
  category: 'Electronics',
  price: 1000,
  description: 'A new laptop',
  sku: 'SKU123',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProductRepository = {
  create: jest.fn().mockReturnValue(mockProduct),
  save: jest.fn().mockResolvedValue(mockProduct),
  findOne: jest.fn().mockResolvedValue(mockProduct),
  preload: jest.fn().mockResolvedValue(mockProduct),
  remove: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([mockProduct]),
  })),
};

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const dto: CreateProductDto = {
        name: 'Laptop',
        category: 'Electronics',
        price: 1000,
        description: 'A new laptop',
        sku: 'SKU123',
      };
      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });

    it('should handle duplicate key errors', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue({ code: '23505', detail: 'Duplicate entry' });

      await expect(
        service.create({
          name: 'Laptop',
          category: 'Electronics',
          price: 1000,
          description: 'A new laptop',
          sku: 'SKU123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return filtered products', async () => {
      const result = await service.findAll({
        category: 'Electronics',
        minPrice: 500,
        maxPrice: 1500,
        limit: 10,
        page: 1,
      });
      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const result = await service.findOne('1');
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('2')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update and return a product', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValue(mockProduct);
      jest.spyOn(repository, 'save').mockResolvedValue(mockProduct);

      const dto: UpdateProductDto = { name: 'Updated Laptop' };
      const result = await service.update('1', dto);
      expect(repository.preload).toHaveBeenCalledWith({ id: '1', ...dto });
      expect(repository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValue(null);

      await expect(service.update('2', { name: 'Updated' })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);
      await expect(service.remove('1')).resolves.toEqual(
        'Product was deleted successfully',
      );
      expect(repository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new BadRequestException(
            `Product with id ${mockProduct.id} not found`,
          ),
        );

      await expect(service.remove('2')).rejects.toThrow(BadRequestException);
    });
  });
});
