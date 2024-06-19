import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // "/auth/register"
  async registerUser(registerUser: RegisterUserDto) {
    return 'register user';
  }

  // "/auth/login"
  async loginUser(loginUser: LoginUserDto) {
    return 'login user';
  }

  // "/auth/logout"
  async logoutUser() {
    return 'logout user';
  }
}
