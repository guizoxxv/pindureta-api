import { ApiProperty } from '@nestjs/swagger';

export class GetAppNameResponse {
  @ApiProperty()
  application: string;
}