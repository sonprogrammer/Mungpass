'use client';

import { useUserStore } from '@/entities/user/model';
import {useShallow} from 'zustand/react/shallow'
import { AuthWidget } from '@/widgets/auth/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LandingPageWidget() {
  const router = useRouter()
  const { profile, isLoading } = useUserStore(useShallow((state) => ({profile: state.profile, isLoading: state.isLoading})))

  useEffect(() => {
    if(isLoading) return
    if (!profile) return

    if (!profile.role || !profile.phone_number) {
      return
    }

    if (profile.role === 'user') {
      const next = new URLSearchParams(window.location.search).get('next')
      let destination = '/home'
      if(next){
        try {
          const target = new URL(next, window.location.origin)
          if(target.origin === window.location.origin && target.pathname === 'home'){
            destination = `${target.pathname}${target.search}`
          }
        } catch {
          destination = '/home'
        }
        router.replace(destination)
      }
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