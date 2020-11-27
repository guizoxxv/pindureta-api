import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from '../logger/logger.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDTO): Promise<void> {
    const passwordHash = await bcrypt.hash(dto.password, 12);

    try {
      await this.userModel.create({
        name: dto.name,
        email: dto.email,
        password: passwordHash,
      });
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('E-mail already in use');
      }
    }
  }

  async findOne(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }
}