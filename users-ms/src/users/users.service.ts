import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // "/users"
  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, page } = paginationDto;
      const offset = (page - 1) * limit;
      const users = await this.userModel.find().skip(offset).limit(limit);
      const totalPageData = await this.userModel.countDocuments();
      const totalPage = Math.ceil(totalPageData / limit);
      if (!users)
        throw new RpcException({
          message: 'Users not found',
          status: HttpStatus.NOT_FOUND,
        });
      return { data: users, pagination: { page, limit, totalPage } };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/users/get/:user"
  async findOne(user_ID: string) {
    try {
      const user = await this.userModel.findById(user_ID);
      if (!user)
        throw new RpcException({
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        });
      return user;
    } catch (error) {
      throw new RpcException(error);
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
        throw new RpcException({
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        });
      return userUpdated;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/users/delete/:user"
  async remove(user_ID: string) {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(user_ID);
      if (!userDeleted)
        throw new RpcException({
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        });
      return `User ${user_ID} deleted`;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
