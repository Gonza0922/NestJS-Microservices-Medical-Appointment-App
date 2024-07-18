import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // "/auth/register"
  async registerUser(registerUser: RegisterUserDto) {
    try {
      const { email, password } = registerUser;
      const findEmail = await this.userModel.findOne({ email });
      if (findEmail)
        throw new RpcException({
          message: 'Email already exists',
          status: HttpStatus.BAD_REQUEST,
        });
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await this.userModel.create({
        ...registerUser,
        password: hashedPassword,
      });
      const userSaved = await userCreated.save();
      const payload = { user_ID: userSaved._id };
      const userToken = await this.jwtService.signAsync(payload);
      return { user: userSaved, token: userToken };
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  // "/auth/login"
  async loginUser(loginUser: LoginUserDto) {
    try {
      const { email, password } = loginUser;
      const findUser = await this.userModel.findOne({ email });
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
      const payload = { user_ID: findUser._id };
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
