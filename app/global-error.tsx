'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
   useEffect(() => {
    console.error(error)
    console.error(JSON.stringify(error, null, 2))
  }, [error])

  return (
    <div>
      <pre>{String(error)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}