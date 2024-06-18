import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  registerUser(createUser: RegisterUserDto) {
    return this.authClient.send({ cmd: 'registerUser' }, createUser);
  }

  loginUser(loginUser: LoginUserDto) {
    return this.authClient.send({ cmd: 'loginUser' }, loginUser);
  }

  logoutUser() {
    return this.authClient.send({ cmd: 'logoutUser' }, {});
  }
}
