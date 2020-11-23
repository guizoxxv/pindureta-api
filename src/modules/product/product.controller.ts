import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get('products')
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
