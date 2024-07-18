import { Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RcpExceptionFilter implements RcpExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError()['error'];
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }

    console.log(exception);

    if (exception && exception['error'].status === 401) {
      const error = exception['error'];
      return response.status(error.status).json(error);
    }

    response.status(400).json({
      status: 400,
      message: exception['error'],
    });
  }
}
