import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import OrderItemDTO from './orderItem.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  @ApiProperty({ type: [OrderItemDTO] })
  items: OrderItemDTO[];

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value?: number;
}