import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import OrderItemDTO from './dtos/orderItem.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>
  ) {}

  async create(items: OrderItemDTO[], value?: number): Promise<void> {
    const total = items.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    await this.orderModel.create({
      items,
      total,
      value: value ? value : total,
    });
  }
}