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
import { ContactInfoProps } from "../types"

const ContactInfoTable = ({
    data
}: ContactInfoProps) => {
    return (
        <div className="flex p-10">
          <Table>
              <TableCaption>Contact Information</TableCaption>
              <TableHeader>
                  <TableRow>
                  <TableHead>Registrant Name</TableHead>
                  <TableHead>Technical Contact Name</TableHead>
                  <TableHead>Administrative Contact Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                  <TableCell className="font-medium">{data?.info?.registrant_name}</TableCell>
                  <TableCell>{data?.info?.technical_contact_name}</TableCell>
                  <TableCell>{data?.info?.admin_contact_name}</TableCell>
                  <TableCell>{data?.info?.contact_email}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </div>
    )
}

export default ContactInfoTable