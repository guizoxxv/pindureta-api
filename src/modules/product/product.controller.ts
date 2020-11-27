import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { EditProductDTO } from './dtos/editProduct.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@UseGuards(AuthGuard)
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  async create(
    @Body() dto: CreateProductDTO,
  ): Promise<void> {
    await this.productService.create(dto);
  }

  @Patch()
  async edit(
    @Body() dto: EditProductDTO,
  ): Promise<void> {
    await this.productService.edit(dto);
  }

  @Delete()
  async delete(
    @Body('id') id: string,
  ): Promise<void> {
    await this.productService.delete(id);
  }
}
