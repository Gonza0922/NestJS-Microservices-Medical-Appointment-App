import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsersEndpoint(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
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
