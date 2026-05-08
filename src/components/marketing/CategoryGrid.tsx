'use client'

import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: 'Gestión de Clientes',
    image: 'https://images.unsplash.com/photo-1556740734-7f1a82b71439?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/crm',
  },
  {
    title: 'Facturación Electrónica',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/facturacion',
  },
  {
    title: 'Gestión de Proyectos',
    image: 'https://images.unsplash.com/photo-1507207611509-af012a3ede9a?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/proyectos',
  },
  {
    title: 'Inteligencia de Negocios',
    image: 'https://images.unsplash.com/photo-1551288049-bbda48642150?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/bi',
  },
  {
    title: 'Inventario & Stock',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/inventario',
  },
  {
    title: 'Recursos Humanos',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/rrhh',
  },
  {
    title: 'WhatsApp Business API',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/whatsapp',
  },
  {
    title: 'Soporte & Ticketing',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    link: '/servicios/soporte',
  }
]

export default function CategoryGrid() {
  return (
    <section className="bg-[#2B4EFF] py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-12 w-full">
        {categories.map((cat, i) => (
          <div 
            key={i}
            className="flex flex-col items-center w-full group"
          >
            {/* Rectangular Image Container - 50/50 - STRAIGHT EDGES */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
                <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Central Overlay Button - STRAIGHT EDGES */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link href={cat.link} className="bg-white text-[#2B4EFF] px-8 py-5 text-[13px] font-[900] uppercase tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all duration-300 rounded-none text-center leading-relaxed">
                        Ver Módulo<br/>{cat.title}
                    </Link>
                </div>
            </div>
            
            {/* Action Button Below- White Rectangular (BORDES RECTOS) */}
            <div className="mt-8 mb-4 flex justify-center w-full">
                <Link 
                    href={cat.link} 
                    className="w-[280px] py-4 bg-white text-[#2B4EFF] text-[12px] font-[900] uppercase tracking-[0.4em] text-center rounded-none hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 shadow-xl"
                >
                    Explorar
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

