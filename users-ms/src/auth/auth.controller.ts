import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'registerUser' })
  register(@Payload() registerUser: RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @MessagePattern({ cmd: 'loginUser' })
  login(@Payload() loginUser: LoginUserDto) {
    return this.authService.loginUser(loginUser);
  }

  @MessagePattern({ cmd: 'logoutUser' })
  logout() {
    return this.authService.logoutUser();
  }
}
