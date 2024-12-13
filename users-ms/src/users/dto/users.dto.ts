import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  user_ID: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsOptional()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
