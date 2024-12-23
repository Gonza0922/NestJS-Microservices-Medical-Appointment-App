import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader)
      throw new RpcException({
        message: 'Authorization header not found',
        status: HttpStatus.UNAUTHORIZED,
      });
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new RpcException({
        message: 'Invalid token format',
        status: HttpStatus.UNAUTHORIZED,
      });
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: envs.tokenSecure,
      });
      if (!user)
        throw new RpcException({
          message: 'Invalid token',
          status: HttpStatus.UNAUTHORIZED,
        });
      request['user'] = user;
      request['token'] = token;
      return true;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
