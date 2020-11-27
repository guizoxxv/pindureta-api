import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetAppNameResponse } from './classes/getAppNameResponse';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  appName(): GetAppNameResponse {
    return this.appService.getAppName();
  }
}
