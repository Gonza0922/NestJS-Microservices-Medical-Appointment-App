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

  findOne(user_ID: string) {
    return `This action returns a #${user_ID} user`;
  }

  update(user_ID: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${user_ID} user`;
  }

  remove(user_ID: string) {
    return `This action removes a #${user_ID} user`;
  }
}
