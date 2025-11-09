import { LandingNav } from '@/components/landing/landing-nav'
import { HeroSection } from '@/components/landing/hero-section'
import { ServicesSection } from '@/components/landing/services-section'
import { ProcessSection } from '@/components/landing/process-section'
import { LandingFooter } from '@/components/landing/landing-footer'
import { AtmosphericBackground } from '@/components/landing/atmospheric-background'

export default function LandingPage() {
  return (
    <AtmosphericBackground variant="light">
      <LandingNav />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <LandingFooter />
    </AtmosphericBackground>
  ) 
}
