import { IsIn, IsString } from 'class-validator';

export class DomainInfoQueryDto {
  @IsString()
  domain_name: string;

  @IsIn(['domain', 'contact'], {
    message: 'type must be either "domain" or "contact"',
  })
  type: 'domain' | 'contact';
}