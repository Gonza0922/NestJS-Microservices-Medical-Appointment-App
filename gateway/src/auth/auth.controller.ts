import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUserEndpoint(@Body() registerUser: RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @Post('/login')
  loginUserEndpoint(@Body() loginUser: LoginUserDto) {
    return this.authService.loginUser(loginUser);
  }

  @Post('/logout')
  logoutUserEndpoint() {
    return this.authService.logoutUser();
  }
}
