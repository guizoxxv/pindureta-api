import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { DevelopmentGuard } from 'src/guards/development.guard';
import { CreateUserDTO } from './dtos/createUser.dto';
import { EditUserDTO } from './dtos/editUser.dto';
import { UserService } from './user.service';

@UseGuards(DevelopmentGuard, AdminGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateUserDTO,
  ): Promise<void> {
    await this.userService.create(dto);
  }

  @Patch()
  async edit(
    @Body() dto: EditUserDTO,
  ): Promise<void> {
    await this.userService.edit(dto);
  }

  @Delete()
  async delete(
    @Body('id') id: string,
  ): Promise<void> {
    await this.userService.delete(id);
  }
}
