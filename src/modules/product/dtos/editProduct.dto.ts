import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditProductDTO {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}