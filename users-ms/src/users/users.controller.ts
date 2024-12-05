import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
import { PaginationDto } from './../common/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload() user_ID: string) {
    return this.usersService.findOne(user_ID);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() updateUser: UpdateUserDto) {
    return this.usersService.update(updateUser.user_ID, updateUser);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() user_ID: string) {
    return this.usersService.remove(user_ID);
  }
}
