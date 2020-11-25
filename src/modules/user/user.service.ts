import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from '../logger/logger.service';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }
}