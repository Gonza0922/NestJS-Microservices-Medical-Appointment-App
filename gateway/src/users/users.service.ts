import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/users.dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async findAll(paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'findAllUsers' }, paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(user_ID: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'findOneUser' }, user_ID),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateUser(user_ID: string, updateUser: UpdateUserDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'updateUser' }, { user_ID, ...updateUser }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async removeUser(user_ID: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'removeUser' }, user_ID),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
