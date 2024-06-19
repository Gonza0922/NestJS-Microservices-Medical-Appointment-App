import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader)
      throw new HttpException(
        'Authorization header not found',
        HttpStatus.UNAUTHORIZED,
      );
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new HttpException('Invalid token format', HttpStatus.UNAUTHORIZED);
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECURE,
      });
      if (!user)
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      request['user'] = user;
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
}
