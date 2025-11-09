'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Data Collection',
      description:
        'Multi-step form captures all required information with intelligent validation and auto-save functionality.',
    },
    {
      number: '02',
      title: 'Document Upload',
      description:
        'Drag-and-drop document management with OCR text extraction for automated data verification.',
    },
    {
      number: '03',
      title: 'Automated Screening',
      description:
        'Real-time sanctions screening and risk assessment powered by machine learning algorithms.',
    },
    {
      number: '04',
      title: 'Compliance Review',
      description:
        'Role-based review workflow with automated routing for high-risk cases requiring manual approval.',
    },
    {
      number: '05',
      title: 'Continuous Monitoring',
      description:
        'Ongoing adverse media scanning and risk score updates to maintain compliance over time.',
    },
  ]

  return (
    <section id="process" className="relative py-20 md:py-32 lg:py-40 bg-white">
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
            How it
            <br />
            <span className="italic text-neutral-600">actually works</span>
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-neutral-600">
            A seamless workflow from initial submission to ongoing compliance monitoring.
          </p>
        </motion.div>

        {/* process steps */}
        <div className="mt-16 md:mt-20 lg:mt-24 space-y-6 md:space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:-translate-x-2 hover:border-neutral-300 hover:shadow-lg md:p-12"
            >
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12">
                {/* step number */}
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                    {step.number}
                  </div>
                </div>

                {/* content */}
                <div className="flex-1">
                  <h3 className="font-serif text-3xl font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* check icon */}
                <div className="flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              {/* connecting line (except last item) */}
              {index < steps.length - 1 && (
                <div className="absolute bottom-[-8px] left-[63px] hidden h-8 w-0.5 bg-gradient-to-b from-primary-500 to-transparent md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
