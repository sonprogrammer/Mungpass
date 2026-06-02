
import { Suspense } from 'react'
import { LandingPageWidget } from '@/widgets/auth/ui/LandingPageWidget';
import { IntroSection } from '@/widgets/landing/ui/IntroSection';

export default function LandingPage() {


  return (
    <>
      <Suspense fallback={<IntroSection/>}>
        <LandingPageWidget />
      </Suspense>
    </>
  )
}