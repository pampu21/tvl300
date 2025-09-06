'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { responseToDomainInfo } from "@/module/domain/api"
import { useState } from "react"
import { toast } from "sonner"
import ContactInfoTable from "@/module/domain/components/contact-info"
import DomainInfoTable from "@/module/domain/components/domain-info"

export default function Home() {
  const [domain, setDomain] = useState('')
  const [type, setType] = useState<'domain' | 'contact' | ''>('')
  const [result, setResult] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleDomainInfo = async (domain_name: string, type: string ) => {
    if (!domain_name) {
      toast.error("Domain name is required");
      return;
    }
    
    if (!type) {
      toast.error("Please select type");
      return;
    }
    
    setLoading(true)
    try {
      const res = await responseToDomainInfo({
        domain_name,
        type,
      })
      setResult(res)
      toast.success("successfully!", { description: 'Data loaded'})
    } catch (error: any) {
      console.log(error)
      toast.error("Failed", {
        description: error?.message || "An unexpected error occurred.",
      })
      setResult(null) 
      setLoading(false)       
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Find your domain information</CardTitle>
            <CardDescription>
              Enter domain name then submit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Domain Name</Label>
                  <Input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="amazon.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select 
                    value={type}
                    onValueChange={(t: 'domain' | 'contact') => setType(t)}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domain">Domain</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button 
              variant={"default"} 
              type="submit"  
              className="w-full"
              onClick={() => handleDomainInfo(domain, type)}
              disabled={loading ? true : false}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>

      {type === "domain" && result && <DomainInfoTable data={result} />}
      {type === "contact" && result && <ContactInfoTable data={result} />}

    </div>
  );
}
