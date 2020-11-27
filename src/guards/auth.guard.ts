import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as R from 'ramda';
import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private request: any;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    this.request = context.switchToHttp().getRequest();
    
    const authorization: string = R.path(['headers', 'authorization'], this.request);

    if (authorization) {
      return await this.validateToken(authorization);
    }

    return false;
  }

  private async validateToken(
    authorization: string
  ): Promise<boolean> {
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      return false;
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { sub } = decoded as TokenPayload;

      this.attachUserIdToRequest(sub);
      
      return true;
    } catch (err) {
      return false
    } 
  }

  private attachUserIdToRequest(userId: string): void {
    this.request.user = {
      id: userId,
    };
  }
}