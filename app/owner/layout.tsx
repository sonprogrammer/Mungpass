'use client'

import OwnerHeader from '@/widgets/header/ui/OwnerHeader';
import { OwnerNavbar } from '@/widgets/owner/ui/OwnerNavbar';
import { App, ConfigProvider } from 'antd';
import React from 'react'


export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <App>
        <div className="flex justify-center bg-slate-200 h-screen">
          <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
            <OwnerHeader />

            <main className={`flex-1 bg-[#fafafa] overflow-y-auto `}>
              {children}
            </main>

            <div className="bg-[#fafafa] w-full shrink-0">
              <OwnerNavbar />
            </div>

          </div>
        </div>
      </App>
    </ConfigProvider>
  )
}