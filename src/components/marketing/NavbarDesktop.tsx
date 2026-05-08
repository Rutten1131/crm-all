'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { dropdownItems, simpleItems } from './nav-data'
import Logo from '../Logo'

export default function NavbarDesktop() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200)
  }

  return (
    <div id="header-desktop" className="h-full max-w-7xl mx-auto flex items-center px-8">
      <Link href="/" className="flex items-center shrink-0" style={{ marginRight: '32px' }}>
        <Logo variant="full" width={110} height={36} className="text-[#1A1F3C]" />
      </Link>

      {/* Nav Items — RESTORED TO PERFECT VERSION */}
      {dropdownItems.map((item) => (
        <div 
          key={item.name} 
          className="relative h-[44px] flex items-center"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            className="flex items-center h-full hover:text-[#2B4EFF] transition-colors whitespace-nowrap"
            style={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: '#1A1F3C', 
              paddingLeft: '16px', 
              paddingRight: '16px' 
            }}
          >
            {item.name}
            <ChevronDown size={11} style={{ 
              marginLeft: '4px', 
              opacity: activeDropdown === item.name ? 1 : 0.4, 
              transform: activeDropdown === item.name ? 'rotate(180deg)' : 'none', 
              transition: 'all 0.2s' 
            }} />
          </Link>

          {/* Dropdown: White, Square, Border */}
          {activeDropdown === item.name && (
            <div 
              className="absolute top-[44px] left-0 z-50"
              style={{ minWidth: '220px', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.sub.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="block hover:text-[#2B4EFF] hover:bg-[#F0F4FF] transition-all"
                  style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 400, color: '#6B7280' }}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Simple Items */}
      {simpleItems.map((item) => (
        <Link 
          key={item.name}
          href={item.href}
          className="flex items-center h-[44px] hover:text-[#2B4EFF] transition-colors whitespace-nowrap"
          style={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#1A1F3C', 
            paddingLeft: '16px', 
            paddingRight: '16px' 
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
