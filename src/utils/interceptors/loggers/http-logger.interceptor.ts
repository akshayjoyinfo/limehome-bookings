import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpLoggerInterceptor.name);

  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const context = `${executionContext.getClass().name}/${
      executionContext.getHandler().name
    }`;

    const request = executionContext.switchToHttp().getRequest();
    const response = executionContext.switchToHttp().getResponse();

    request['context'] = context;

    if (!request.headers?.traceid) {
      request.headers.traceid = uuidv4();
      request.id = request.headers.traceid;
    }

    
    this.logger.log(
      { url: request.url, method: request.method },
      `${request.method} ${request.url}`,
    );
    this.logger.log(
      { url: request.url, method: request.method },
      `${request.method} ${request.url}`,
    );
    return next.handle();
  }
}
