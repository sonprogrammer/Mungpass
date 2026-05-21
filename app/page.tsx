
import { Suspense } from 'react'
import { LandingPageWidget } from '@/widgets/auth/ui/LandingPageWidget';
import { MapLoading } from '@/widgets/around/ui/MapLoading';

export default function LandingPage() {
 

  return (
    <Suspense fallback={<MapLoading message='사용자 정보 확인중'/>}>
      <LandingPageWidget />
    </Suspense>
  )
}