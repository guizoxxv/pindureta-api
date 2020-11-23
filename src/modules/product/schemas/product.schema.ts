import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);