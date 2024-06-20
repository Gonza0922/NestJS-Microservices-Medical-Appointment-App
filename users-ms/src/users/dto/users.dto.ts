import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  user_ID: string;
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
