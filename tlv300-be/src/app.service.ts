import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DomainInfoResource } from './resources/domain-info.resource';
import { lastValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config';
import { ContactInfo, DomainInfo } from './types';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDomainInfo(
    domain_name: string,
    type: string,
  ): Promise<{
    type: string,
    info: DomainInfo | ContactInfo
  }> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.configService.get<string>('EXTERNAL_API')}`,
          {
            "domainName": domain_name,
            outputFormat: 'json'
          },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>('EXTERNAL_API_KEY')}`,
              'Content-Type': 'application/json'
            },
          },
        )
      );
      
      return {
        type: type,
        info: DomainInfoResource.toJson(response.data, type)
      }
    } catch (error) {
      if (error?.response?.status) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Error In External API';

        throw new BadRequestException(`Error ${status}: ${message}`);
      }

      throw new InternalServerErrorException('Failed to fetch domain info');
    }
  }
}
