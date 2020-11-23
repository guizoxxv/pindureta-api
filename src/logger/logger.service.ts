import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLoggerService {
  private nodeEnv: string;
  private isTesting: boolean;
  private appName: string;
  private appVersion: string;
  private logger: winston.Logger;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.nodeEnv = this.configService.get<string>('NODE_ENV');
    this.isTesting = this.nodeEnv === 'testing';
    this.appName = this.configService.get<string>('APP_NAME');
    this.appVersion = this.configService.get<string>('APP_VERSION', 'v1');
    this.logger = winston.createLogger({
      level: this.configService.get<string>('APP_LOG_LEVEL', 'info'),
      transports: this.getTransport(),
      exitOnError: false,
    });
  }

  public debug(
    message,
    tid?: string
  ) {
    if (this.isTesting) { return; }

    this.log('debug', message, tid);
  }

  public info(
    message,
    tid?: string
  ) {
    if (this.isTesting) { return; }
    this.log('info', message, tid);
  }

  public warn(
    message,
    tid?: string
  ) {
    if (this.isTesting) { return; }

    this.log('warn', message, tid);
  }

  public error(
    message,
    tid?: string
  ) {
    if (this.isTesting) { return; }

    this.log('error', message, tid);
  }

  private log(
    level: string,
    message: string,
    tid?: string
  ) {
    tid = tid ? tid : uuid();

    const logContent = {
      date: new Date().toISOString(),
      application: this.appName,
      version: this.appVersion,
      environment: this.nodeEnv,
      message: message,
      tid: tid,
    };

    this.logger.log(level, logContent);
  }

  private getTransport() {
    return [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.prettyPrint(),
          winston.format.colorize({ all: true })
        )
      }),
    ];
  }
}
