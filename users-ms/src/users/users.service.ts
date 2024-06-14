import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // "/users"
  async create(createUser: CreateUserDto) {
    try {
      const userCreated = await this.userModel.create(createUser);
      return await userCreated.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/users"
  async findAll() {
    try {
      const users = await this.userModel.find();
      if (!users)
        throw new HttpException('users not found', HttpStatus.NOT_FOUND);
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/users/get/:user"
  async findOne(user_ID: string) {
    try {
      const user = await this.userModel.findById(user_ID);
      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/users/put/:user"
  async update(user_ID: string, updateUser: UpdateUserDto) {
    try {
      const userUpdated = await this.userModel.findByIdAndUpdate(
        user_ID,
        updateUser,
        { new: true },
      );
      if (!userUpdated)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      return userUpdated;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/users/delete/:user"
  async remove(user_ID: string) {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(user_ID);
      if (!userDeleted)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      return `User ${user_ID} deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
