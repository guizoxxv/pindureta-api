import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { EditProductDTO } from './dtos/editProduct.dto';
import { CreateProductDTO } from './dtos/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>
  ) {}

  async create(dto: CreateProductDTO): Promise<void> {
    try {
      await this.productModel.create(dto);
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Name already in use');
      }
      
      throw e;
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async edit({ id, ...rest }: EditProductDTO): Promise<void> {
    await this.productModel.findByIdAndUpdate(
      id,
      {
        ...rest,
        updated_at: new Date,
      }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}