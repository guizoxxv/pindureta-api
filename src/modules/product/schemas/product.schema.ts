import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({
    required: false,
  })
  _id?: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    default: new Date,
  })
  created_at?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);