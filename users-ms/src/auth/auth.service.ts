import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // "/auth/register"
  async registerUser(registerUser: RegisterUserDto) {
    try {
      const { email, password } = registerUser;
      const findEmail = await this.prisma.user.findUnique({ where: { email } });
      if (findEmail)
        throw new RpcException({
          message: 'Email already exists',
          status: HttpStatus.BAD_REQUEST,
        });
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await this.prisma.user.create({
        data: {
          ...registerUser,
          password: hashedPassword,
        },
      });
      const payload = { user_ID: userCreated.id };
      const userToken = await this.jwtService.signAsync(payload);
      return { user: userCreated, token: userToken };
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  // "/auth/login"
  async loginUser(loginUser: LoginUserDto) {
    try {
      const { email, password } = loginUser;
      const findUser = await this.prisma.user.findUnique({ where: { email } });
      if (!findUser)
        throw new RpcException({
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        });
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch)
        throw new RpcException({
          message: 'Incorrect password',
          status: HttpStatus.BAD_REQUEST,
        });
      const payload = { user_ID: findUser.id };
      const UserToken = await this.jwtService.signAsync(payload);
      return { user: findUser, token: UserToken };
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  // "/auth/logout"
  async logoutUser() {
    try {
      return { message: 'Disconnected' };
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }
}
