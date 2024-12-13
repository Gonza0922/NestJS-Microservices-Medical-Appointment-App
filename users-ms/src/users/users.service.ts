import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/users.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // "/users"
  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, page } = paginationDto;
      const offset = limit ? (page - 1) * limit : undefined;
      const users = await this.prisma.user.findMany({
        skip: offset,
        take: limit,
      });
      const totalPageData = await this.prisma.user.count();
      let totalPage = Math.ceil(totalPageData / limit);
      totalPage = Number.isNaN(totalPage) ? 1 : totalPage;
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
  async findOne(user_ID: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: user_ID },
      });
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
  async update(user_ID: number, updateUser: UpdateUserDto) {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id: user_ID },
        data: updateUser,
      });
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
  async remove(user_ID: number) {
    try {
      const userDeleted = await this.prisma.user.delete({
        where: { id: user_ID },
      });
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
