'use client'

import Image from 'next/image'

export default function FeaturedProduct() {
  return (
    <section id="featured-section" className="bg-black w-full pb-20">
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1600" 
          alt="ALL CRM Pro Banner" 
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  )
}
