'use client'

import Link from 'next/link'
import Image from 'next/image'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-1">
            <div className="relative h-12 w-48 mb-3">
              <Image
                src="/logo.png"
                alt="Stamped"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              Automated compliance & onboarding platform
            </p>
          </div>

          {/* product */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Product</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('services')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('process')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* company */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 border-t border-neutral-200 pt-8 text-center">
          <p className="text-sm text-neutral-600">
            © {currentYear} Stamped. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

