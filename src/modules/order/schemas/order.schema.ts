import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OrderItem from '../interfaces/orderItem.interface';

export type OrderDocument = Order & Document;

@Schema({ collection: 'orders' })
export class Order {
  @Prop({
    required: true,
  })
  items: OrderItem[];

  @Prop({
    required: true,
  })
  total: number;

  @Prop({
    required: false,
  })
  value?: number;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    default: new Date,
  })
  created_at?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);