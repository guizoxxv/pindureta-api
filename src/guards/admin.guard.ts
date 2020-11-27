import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';
import * as R from 'ramda';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey: string = R.path(['headers', 'api-key'], request);

    return apiKey === process.env.API_KEY;
  }
}