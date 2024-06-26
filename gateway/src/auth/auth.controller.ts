import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/register')
  registerUserEndpoint(@Body() registerUser: RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @Post('/login')
  loginUserEndpoint(@Body() loginUser: LoginUserDto) {
    return this.authService.loginUser(loginUser);
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthGuard)
  logoutUserEndpoint() {
    return this.authService.logoutUser();
  }

  @ApiBearerAuth()
  @Get('/verify')
  @UseGuards(AuthGuard)
  verifyUserEndpoint(@Req() req: Request) {
    return this.userService.findOne(req['user'].user_ID);
  }
}
