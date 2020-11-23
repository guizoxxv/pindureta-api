import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import GetAppNameResponse from './interfaces/GetAppNameResponse';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  appName(): GetAppNameResponse {
    return this.appService.getAppName();
  }
}
