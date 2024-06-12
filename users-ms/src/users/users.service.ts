import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(user_ID: number) {
    return `This action returns a #${user_ID} user`;
  }

  update(user_ID: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${user_ID} user`;
  }

  remove(user_ID: number) {
    return `This action removes a #${user_ID} user`;
  }
}
