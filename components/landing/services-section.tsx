'use client'

import { motion } from 'framer-motion'
import { FeatureCard } from './feature-card'
import {
  Users,
  Building2,
  Shield,
  FileSearch,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'

export function ServicesSection() {
  const features = [
    {
      icon: Users,
      title: 'Client Onboarding',
      description:
        'Streamlined multi-step process for collecting and verifying client information with automated document management and real-time validation.',
    },
    {
      icon: Building2,
      title: 'Vendor Management',
      description:
        'Comprehensive vendor onboarding workflow with procurement-specific fields, compliance checks, and approval workflows.',
    },
    {
      icon: Shield,
      title: 'Automated Risk Assessment',
      description:
        'ML-powered risk scoring engine that evaluates entities based on country, industry, sanctions screening, and historical data.',
    },
    {
      icon: FileSearch,
      title: 'Sanctions Screening',
      description:
        'Real-time screening against global sanctions databases including OFAC, UN, and EU lists with confidence scoring and match detection.',
    },
    {
      icon: AlertTriangle,
      title: 'Adverse Media Monitoring',
      description:
        'Continuous monitoring of news sources to detect negative coverage, legal issues, and reputational risks for all onboarded entities.',
    },
    {
      icon: TrendingUp,
      title: 'Compliance Dashboard',
      description:
        'Comprehensive compliance oversight with risk distribution analytics, screening status tracking, and regulatory reporting tools.',
    },
  ]

  return (
    <section id="services" className="relative py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Everything you need
            <br />
            <span className="italic text-neutral-600">in one platform</span>
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-neutral-600">
            Comprehensive client and vendor onboarding with automated compliance,
            risk assessment, and continuous monitoring.
          </p>
        </motion.div>

        {/* feature grid */}
        <div className="mt-16 md:mt-20 lg:mt-24 grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeInOut" }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

