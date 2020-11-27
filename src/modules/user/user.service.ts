import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from '../logger/logger.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { EditUserDTO } from './dtos/editUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerService,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDTO): Promise<void> {
    const passwordHash = await this.hashPassword(dto.password);

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

      throw e;
    }
  }

  async findOne(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async edit({ id, ...rest }: EditUserDTO): Promise<void> {
    if (rest.password) {
      rest.password = await this.hashPassword(rest.password);
    }

    await this.userModel.findByIdAndUpdate(
      id,
      {
        ...rest,
        updated_at: new Date,
      }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}