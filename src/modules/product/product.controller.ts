import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
