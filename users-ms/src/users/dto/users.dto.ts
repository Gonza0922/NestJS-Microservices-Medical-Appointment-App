import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password must contain at least one uppercase letter and a number',
  })
  password: string;
}

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
