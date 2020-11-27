import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { DevelopmentGuard } from 'src/guards/development.guard';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(DevelopmentGuard, AdminGuard)
  async create(
    @Body() dto: CreateUserDTO,
  ): Promise<void> {
    await this.userService.create(dto);
  }
}
