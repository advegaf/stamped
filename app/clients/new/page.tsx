'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/ui/stepper'
import { FileUpload } from '@/components/ui/file-upload'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

const steps = [
  { label: 'Basic Information' },
  { label: 'Contact Details' },
  { label: 'Business Information' },
  { label: 'Document Upload' },
]

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
]

const industries = [
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'energy', label: 'Energy' },
  { value: 'other', label: 'Other' },
]

const entityTypes = [
  { value: 'corporation', label: 'Corporation' },
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_proprietor', label: 'Sole Proprietor' },
  { value: 'nonprofit', label: 'Non-profit Organization' },
]

export default function NewClientPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    // step 1 - basic info
    legalName: '',
    tradingName: '',
    entityType: '',
    registrationNumber: '',
    country: '',
    
    // step 2 - contact stuff
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    secondaryContactName: '',
    secondaryContactEmail: '',
    secondaryContactPhone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    
    // step 3 - business deets
    industry: '',
    annualRevenue: '',
    numberOfEmployees: '',
    businessDescription: '',
    purposeOfRelationship: '',
    anticipatedTransactionVolume: '',
  })

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // simulate api call, add real backend integration later
    setTimeout(() => {
      setLoading(false)
      router.push('/clients')
    }, 2000)
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles([...files, ...newFiles])
  }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <DashboardShell title="New Client" userRole="compliance" userName="John Smith">
      <div className="mx-auto max-w-4xl space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Clients', href: '/clients' },
            { label: 'New Client' },
          ]}
        />

        <Card>
          <CardHeader>
            <CardTitle>Client Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

            {/* step 1 form */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Legal Name"
                    placeholder="Acme Corporation Inc."
                    value={formData.legalName}
                    onChange={(e) => handleInputChange('legalName', e.target.value)}
                    required
                  />
                  <Input
                    label="Trading Name (DBA)"
                    placeholder="Acme Corp"
                    value={formData.tradingName}
                    onChange={(e) => handleInputChange('tradingName', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    label="Entity Type"
                    options={entityTypes}
                    value={formData.entityType}
                    onChange={(e) => handleInputChange('entityType', e.target.value)}
                    required
                  />
                  <Input
                    label="Registration Number"
                    placeholder="123456789"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    required
                  />
                </div>

                <Select
                  label="Country of Incorporation"
                  options={countries}
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  required
                />
              </div>
            )}

            {/* step 2 form */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                    Primary Contact
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.primaryContactName}
                      onChange={(e) =>
                        handleInputChange('primaryContactName', e.target.value)
                      }
                      required
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.primaryContactEmail}
                        onChange={(e) =>
                          handleInputChange('primaryContactEmail', e.target.value)
                        }
                        required
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.primaryContactPhone}
                        onChange={(e) =>
                          handleInputChange('primaryContactPhone', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                    Secondary Contact (Optional)
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="Jane Smith"
                      value={formData.secondaryContactName}
                      onChange={(e) =>
                        handleInputChange('secondaryContactName', e.target.value)
                      }
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="jane.smith@example.com"
                        value={formData.secondaryContactEmail}
                        onChange={(e) =>
                          handleInputChange('secondaryContactEmail', e.target.value)
                        }
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        value={formData.secondaryContactPhone}
                        onChange={(e) =>
                          handleInputChange('secondaryContactPhone', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                    Business Address
                  </h3>
                  <div className="space-y-4">
                    <Textarea
                      label="Street Address"
                      placeholder="123 Main Street, Suite 100"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                      <Input
                        label="City"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                      <Input
                        label="State/Province"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                      <Input
                        label="Postal Code"
                        placeholder="10001"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* step 3 form */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <Select
                  label="Industry"
                  options={industries}
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  required
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Annual Revenue (USD)"
                    type="number"
                    placeholder="1000000"
                    value={formData.annualRevenue}
                    onChange={(e) =>
                      handleInputChange('annualRevenue', e.target.value)
                    }
                  />
                  <Input
                    label="Number of Employees"
                    type="number"
                    placeholder="50"
                    value={formData.numberOfEmployees}
                    onChange={(e) =>
                      handleInputChange('numberOfEmployees', e.target.value)
                    }
                  />
                </div>

                <Textarea
                  label="Business Description"
                  placeholder="Provide a brief description of the business activities..."
                  value={formData.businessDescription}
                  onChange={(e) =>
                    handleInputChange('businessDescription', e.target.value)
                  }
                  required
                  rows={4}
                />

                <Textarea
                  label="Purpose of Relationship"
                  placeholder="Describe the purpose of establishing this business relationship..."
                  value={formData.purposeOfRelationship}
                  onChange={(e) =>
                    handleInputChange('purposeOfRelationship', e.target.value)
                  }
                  required
                  rows={4}
                />

                <Input
                  label="Anticipated Transaction Volume (USD/Year)"
                  type="number"
                  placeholder="500000"
                  value={formData.anticipatedTransactionVolume}
                  onChange={(e) =>
                    handleInputChange('anticipatedTransactionVolume', e.target.value)
                  }
                />
              </div>
            )}

            {/* step 4 - upload docs */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                    Required Documents
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Please upload the following documents for KYC verification:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-600">
                    <li>Certificate of Incorporation</li>
                    <li>Articles of Association/Bylaws</li>
                    <li>Proof of Business Address</li>
                    <li>Identification documents for authorized signatories</li>
                    <li>Latest audited financial statements (if available)</li>
                  </ul>
                </div>

                <FileUpload
                  label="Upload Documents"
                  onFileChange={handleFileChange}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={10}
                  multiple
                />
              </div>
            )}

            {/* next/back buttons */}
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} loading={loading}>
                  Submit for Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

