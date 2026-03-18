'use client';

import { AuthWidget } from '@/widgets/auth/ui/AuthWidget';

export default function LandingPage() {

  return (
    <div className='flex justify-center bg-slate-200'>
      <div className='max-w-120 w-full'>
        <AuthWidget />
      </div>
    </div>
  )
}