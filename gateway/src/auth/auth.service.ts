import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async registerUser(createUser: RegisterUserDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'registerUser' }, createUser),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async loginUser(loginUser: LoginUserDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'loginUser' }, loginUser),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async logoutUser() {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'logoutUser' }, {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
