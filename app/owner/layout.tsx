'use client'

import React from 'react'


export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-full'>
      

        <div className="p-8 bg-[#fafafa] flex flex-1">
            
          {children}
        </div>
    </div>
  );
}