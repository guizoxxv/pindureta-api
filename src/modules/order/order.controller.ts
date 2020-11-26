import { Body, Controller, ParseArrayPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import OrderItemDTO from './dtos/orderItem.dto';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async create(
    @Body('items', new ParseArrayPipe({ items: OrderItemDTO }))
    items: OrderItemDTO[],

    @Body('value')
    value?: number,
  ): Promise<void> {
    await this.orderService.create(items, value);
  }
}
