import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import GetAppNameResponse from './interfaces/GetAppNameResponse';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
  ) {}

  getAppName(): GetAppNameResponse {
    return {
      application: this.config.get<string>('APP_NAME', 'pindureta-api'),
    }
  }
}
