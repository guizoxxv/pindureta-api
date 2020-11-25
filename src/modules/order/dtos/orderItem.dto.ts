import { IsNotEmpty, IsNumber } from 'class-validator';

export default class OrderItemDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}