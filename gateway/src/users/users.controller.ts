import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUserEndpoint(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Get()
  findAllUsersEndpoint() {
    return this.usersService.findAll();
  }

  @Get('/get/:user_ID')
  findOneUserEndpoint(@Param('user_ID', ParseIntPipe) user_ID: number) {
    return this.usersService.findOne(user_ID);
  }

  @Put('/put/:user_ID')
  updateUserEndpoint(
    @Param('user_ID', ParseIntPipe) user_ID: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user_ID, updateUser);
  }

  @Delete('/delete/:user_ID')
  removeUserEndpoint(@Param('user_ID', ParseIntPipe) user_ID: number) {
    return this.usersService.removeUser(user_ID);
  }
}
