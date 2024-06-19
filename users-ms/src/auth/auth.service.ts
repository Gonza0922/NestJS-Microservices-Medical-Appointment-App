import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/auth/login"
  async loginUser(loginUser: LoginUserDto) {
    try {
      const { email, password } = loginUser;
      const findUser = await this.userModel.findOne({ email });
      if (!findUser)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch)
        throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
      const payload = { user_ID: findUser._id };
      const UserToken = await this.jwtService.signAsync(payload);
      return { user: findUser, token: UserToken };
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/auth/logout"
  async logoutUser() {
    try {
      return { message: 'Disconnected' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
