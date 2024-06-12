import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  user_ID: number;
  name: string;
  email: string;
}
