'use client';

import { useUserStore } from '@/entities/user/model/useUserStore';
import { AuthWidget } from '@/widgets/auth/ui/AuthWidget';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LandingPageWidget() {
  const router = useRouter()
  const { profile, isLoading } = useUserStore()

  useEffect(() => {
    if(isLoading) return
    if (!profile) return

    if (!profile.role || !profile.phone_number) {
      return
    }

    if (profile.role === 'user') {
      router.replace('/home')
    } else if (profile.role === 'owner') {
      router.replace('/owner')
    } else if (profile.role === 'admin') {
      router.replace('/admin')
    }
  }, [isLoading, profile, router])



  return (
    <div className='flex justify-center bg-slate-200'>
      <div className='max-w-120 w-full'>
        <AuthWidget />
      </div>
    </div>
  )
}