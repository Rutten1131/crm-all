'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/db'

/**
 * OfflinePrefetcher — pre-caches all given URLs so they work offline.
 * Upgraded: Now also fetches JSON data for projects and chats to populate Dexie.
 */
export default function OfflinePrefetcher({ urls }: { urls: string[] }) {
  useEffect(() => {
    if (!urls || urls.length === 0) return

    // SW Data Prefetch (v279: Wait 12s to ensure navigation is fully finished)
    // We only ask the SW to cache the URLs (Offline Shells) using its throttled logic.
    // We explicitly AVOID router.prefetch here because calling it 30 times exhausts the Prisma DB Pool!
    const dataTimer = setTimeout(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'PRECACHE_URLS',
          urls
        })
      }
    }, 12000)

    return () => {
      clearTimeout(dataTimer)
    }
  }, [urls])

  return null
}
