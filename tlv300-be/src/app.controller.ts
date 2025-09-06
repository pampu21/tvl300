import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DomainInfoQueryDto } from './dto/get-domain.dto';
import { ContactInfo, DomainInfo } from './types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/domain/info')
  async getDomainInfo(
    @Query() query: DomainInfoQueryDto
  ): Promise<{
    type: string,
    info: DomainInfo | ContactInfo
  }> {
    return this.appService.getDomainInfo(query.domain_name, query.type)
  }
}
