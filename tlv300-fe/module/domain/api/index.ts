import { AxiosResponse } from "axios";
import api from "@/utils/api";
import { ContactInfoProps, DomainInfoProps, domainParameter } from "../types";

export const responseToDomainInfo = async (data: domainParameter): Promise<ContactInfoProps | DomainInfoProps> => {
    const response: AxiosResponse = await api.post(`/domain/info?domain_name=${data.domain_name}&type=${data.type}`, {});
    return response.data;
};