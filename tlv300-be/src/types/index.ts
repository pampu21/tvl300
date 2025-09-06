interface DomainInfo {
  domain_name: string;
  registrar_name: string;
  registration_date: string;
  expiration_date: string;
  estimated_domain_age: string;
  hostname: string;
}

interface ContactInfo {
  registrant_name: string;
  technical_contact_name: string;
  admin_contact_name: string;
  contact_email: string;
}

export type {
  DomainInfo,
  ContactInfo
};