import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("salom",exception);
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let timestamp = new Date().toISOString();
    let path = request.url;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string[] = ['Something went wrong'];
    let error: string = 'Internal Server Error';
    let details: { name: string; message: string }[] = [];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse() as any;

      if (typeof res === 'string') {
        message = [res];
        error = res;
      } else if (typeof res === 'object') {
        const data = res as any;
        message = Array.isArray(data.message) ? data.message : [data.message];
        error = data.error || error;

        if (data.message && Array.isArray(data.message)) {
          details = data.message.map((msg: string) => {
            const match = msg.match(/^(.*?)must/);
            const field = match ? match[1] : 'unknown';
            return { name: field, message: msg };
          });
        }
      }
    }
    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      error,
      timestamp,
      path,
      details,
    });
  }
}
