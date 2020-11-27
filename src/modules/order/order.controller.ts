import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import CreateOrderDTO from './dtos/createOrderDto';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateOrderDTO,
    @User('id') userId: string,
  ): Promise<void> {
    await this.orderService.create(dto, userId);
  }
}
