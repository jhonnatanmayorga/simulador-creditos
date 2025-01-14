import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus();
      const message = exception.getResponse();
  
      response.status(status).json({
        success: false,
        data: null,
        message: typeof message === 'string' ? message : message['message'],
        error: exception.name,
      });
    }
  }
  