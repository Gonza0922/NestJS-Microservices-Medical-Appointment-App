export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  user_ID: number;
  name: string;
  email: string;
}
