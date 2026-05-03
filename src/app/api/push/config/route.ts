import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // v301: Robust fallback - NEXT_PUBLIC_ is for client bundle, but server needs access to both
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY
  
  if (!publicKey || publicKey === 'dummy' || publicKey.length < 10) {
    console.error('[PUSH CONFIG] VAPID key missing or invalid in server environment:', publicKey)
    return NextResponse.json({ 
      error: 'VAPID public key not configured in server environment variables (.env)',
      publicKey: null 
    }, { status: 500 })
  }

  return NextResponse.json({ publicKey })
}
