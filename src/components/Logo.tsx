'use client'

import React from 'react'
import Image from 'next/image'

interface LogoProps {
  variant?: 'full' | 'icon' | 'dark' | 'negative'
  width?: number | string
  height?: number | string
  className?: string
}

export default function Logo({ variant = 'full', width, height, className }: LogoProps) {
  // Icon variant — positive logo for light backgrounds, negative for dark
  if (variant === 'icon') {
    return (
      <Image
        src="/images/all-logo-teal.png"
        alt="ALL"
        width={Number(width) || 42}
        height={Number(height) || 42}
        className={className}
        style={{ objectFit: 'contain' }}
        priority
      />
    )
  }

  // Negative variant — white logo for dark backgrounds
  if (variant === 'negative' || variant === 'dark') {
    return (
      <Image
        src="/images/all-logo-negative.png"
        alt="ALL"
        width={Number(width) || 42}
        height={Number(height) || 42}
        className={className}
        style={{ objectFit: 'contain' }}
        priority
      />
    )
  }

  // Full variant — the glassmorphic hero logo
  return (
    <Image
      src="/images/all-logo-glass.png"
      alt="ALL — Control Total, Alivio Real"
      width={Number(width) || 140}
      height={Number(height) || 140}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  )
}
