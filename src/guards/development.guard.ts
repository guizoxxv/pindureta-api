import { Injectable, CanActivate, NotFoundException } from '@nestjs/common';

@Injectable()
export class DevelopmentGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    throw new NotFoundException;
  }
}