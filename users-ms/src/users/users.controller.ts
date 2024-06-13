import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
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
