import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private readonly usersClient: ClientProxy) {}

  createUser(createUser: CreateUserDto) {
    return this.usersClient.send({ cmd: 'createUser' }, createUser);
  }

  findAll() {
    return this.usersClient.send({ cmd: 'findAllUsers' }, {});
  }

  findOne(user_ID: string) {
    return this.usersClient.send({ cmd: 'findOneUser' }, user_ID);
  }

  updateUser(user_ID: string, updateUser: UpdateUserDto) {
    return this.usersClient.send(
      { cmd: 'updateUser' },
      { user_ID, ...updateUser },
    );
  }

  removeUser(user_ID: string) {
    return this.usersClient.send({ cmd: 'removeUser' }, user_ID);
  }
}
