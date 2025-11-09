import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-neutral-200/50 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
          <div className="mx-auto mb-6">
            <h1 className="font-sans text-8xl font-bold text-neutral-900">404</h1>
          </div>
          
          <h2 className="font-sans text-2xl font-semibold text-neutral-900 mb-2">
            Page not found
          </h2>
          
          <p className="text-neutral-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button size="lg" className="w-full">
                Go to homepage
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full">
                Go to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

