'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle } from 'lucide-react'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // simulate submission
    setSubmitted(true)
    setTimeout(() => {
      setEmail('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-8 py-20 shadow-2xl md:px-16">
          {/* decorative elements */}
          <div className="absolute left-[-10%] top-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* heading */}
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to transform
              <br />
              <span className="italic">your onboarding?</span>
            </h2>

            <p className="mt-6 text-lg text-white/90">
              Join leading financial institutions using our platform to streamline
              compliance and reduce onboarding time by up to 70%.
            </p>

            {/* form or success message */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-12 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-white/90"
                >
                  Request Access
                </Button>
              </form>
            ) : (
              <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-2 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-white">Thanks! We'll be in touch soon.</p>
              </div>
            )}

            {/* alternative cta */}
            <div className="mt-8 text-white/80">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-white underline underline-offset-4 hover:text-white/90"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

