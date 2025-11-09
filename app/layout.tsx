import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stamped - Automated Compliance & Onboarding',
  description: 'Streamlined client and vendor onboarding platform with automated risk assessment and compliance monitoring',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

