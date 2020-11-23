import { BadRequestException, Injectable } from '@nestjs/common';
import { AppLoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import LoginResponse from './interfaces/loginResponse.interface';
import { PayloadUser } from './types/payloadUser.type';

@Injectable()
export class AuthService {
  private jwtSecret: string;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: AppLoggerService,
    private readonly userService: UserService,
  ) {
    this.jwtSecret = this.config.get<string>('JWT_SECRET', 'secretKey');
  }

  async login(dto: LoginDTO): Promise<LoginResponse> {
    const { email, password } = dto;

    const user = await this.userService.findOne(email);

    if (!user) {
      throw new BadRequestException;
    }

    if (await this.checkPassword(password, user.password)) {
      const payloadUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      const token = this.getJWTToken(payloadUser);

      return {
        user: payloadUser,
        token,
      }
    }

    throw new BadRequestException;
  }

  private async checkPassword(
    requestPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(requestPassword, userPassword);
  }
  
  private getJWTToken(user: PayloadUser) {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      this.jwtSecret,
      {
        expiresIn: '15m',
      }
    );
  }
}