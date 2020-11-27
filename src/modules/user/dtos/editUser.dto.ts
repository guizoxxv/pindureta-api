import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class EditUserDTO {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}