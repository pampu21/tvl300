import * as moment from 'moment'
import { ContactInfo, DomainInfo } from 'src/types';

export class DomainInfoResource {
    static toJson(item: any, type: string): DomainInfo | ContactInfo {
        return type === 'domain' ? {
            domain_name: item?.WhoisRecord?.domainName,
            registrar_name: item?.WhoisRecord?.registrarName,
            registration_date: moment(item?.WhoisRecord?.registryData?.createdDate).format('MMM DD, YYYY h:mm A'),
            expiration_date: moment(item?.WhoisRecord?.registryData?.expiresDate).format('MMM DD, YYYY h:mm A'),
            estimated_domain_age: item?.WhoisRecord?.estimatedDomainAge,
            hostname: this.formatHostname(item?.WhoisRecord?.nameServers?.hostNames)
        }: {
            registrant_name: item?.WhoisRecord?.registrant?.name,
            technical_contact_name: item?.WhoisRecord?.technicalContact?.name,
            admin_contact_name: item?.WhoisRecord?.registrant?.organization,
            contact_email: item?.WhoisRecord?.technicalContact?.email,
        }
    }

    static formatHostname(hostNames: string[]): string {
        const joined = hostNames.join(', ');

        if (joined.length > 25) {
            return joined.slice(0, 25) + '...';
        }

        return joined;
    }
}
