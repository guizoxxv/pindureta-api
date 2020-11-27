import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({
    required: true,
    unique: true,
  })
  @ApiProperty()
  name: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  price: number;

  @Prop({
    default: new Date,
  })
  @ApiProperty()
  created_at?: Date;

  @Prop({
    default: new Date,
  })
  @ApiProperty()
  updated_at?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);