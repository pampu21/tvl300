'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DomainInfoProps } from "../types"

const DomainInfoTable = ({
    data
}: DomainInfoProps) => {
    return (
        <div className="flex p-10">
          <Table>
              <TableCaption>Domain Information</TableCaption>
              <TableHeader>
                  <TableRow>
                  <TableHead>Domain Name</TableHead>
                  <TableHead>Registrar</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Estimated Domain Age</TableHead>
                  <TableHead>Hostname</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                  <TableCell className="font-medium">{data?.info?.domain_name}</TableCell>
                  <TableCell>{data?.info?.registrar_name}</TableCell>
                  <TableCell>{data?.info?.registration_date}</TableCell>
                  <TableCell>{data?.info?.expiration_date}</TableCell>
                  <TableCell>{data?.info?.estimated_domain_age}</TableCell>
                  <TableCell>{data?.info?.hostname}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </div>
    )
}

export default DomainInfoTable