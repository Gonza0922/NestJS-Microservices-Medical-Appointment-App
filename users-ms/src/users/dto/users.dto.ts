export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  user_ID: string;
  name: string;
  email: string;
}
