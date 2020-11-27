import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDTO } from './dtos/createOrderDto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>
  ) {}

  async create(
    dto: CreateOrderDTO,
    userId: string,
  ): Promise<void> {
    const { items, value } = dto;

    const total = items.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);

    await this.orderModel.create({
      items,
      total,
      userId,
      value: value ? value : total,
    });
  }
}