import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { DateTime } from 'luxon';

import { ApiException, ErrorModel } from '../exception';
import * as errorStatus from '../static/http-status.json';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: ApiException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;

    exception.traceid = [exception.traceid, request['id']].find(Boolean);

    console.error(exception.message, exception, exception.context);

    response.status(status).json({
      error: {
        code: status,
        traceid: exception.traceid,
        message: errorStatus[String(status)] || exception.message,
        timestamp: DateTime.fromJSDate(new Date()).setZone(process.env.TZ).toFormat('dd/MM/yyyy HH:mm:ss'),
        path: request.url,
      },
    } as ErrorModel);
  }
}
