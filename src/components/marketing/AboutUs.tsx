'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Heart, LayoutDashboard } from 'lucide-react'

export default function AboutUs() {
  return (
    <section 
      id="nosotros"
      className="bg-white py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Collage (Premium CRM Style) */}
          <div className="relative h-[500px] lg:h-[650px] w-full flex items-center justify-center">
            
            {/* Image 4: Analytics (Top Right - Background) */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -40, rotate: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute top-[5%] right-[5%] w-[45%] h-[180px] lg:h-[220px] bg-[#F9FAFB] shadow-2xl z-1 border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbda48642150?auto=format&fit=crop&q=80&w=600" 
                alt="CRM Analytics" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Image 1: Main Dashboard (Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: -30, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-[10%] left-[2%] w-[55%] h-[240px] lg:h-[300px] bg-[#F3F4F6] shadow-[0_25px_50px_rgba(0,0,0,0.15)] z-2 border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                alt="ALL Dashboard" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Image 2: Team Collaboration (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 60, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-[8%] left-[5%] w-[50%] h-[200px] lg:h-[250px] bg-[#E5E7EB] shadow-[0_20px_45px_rgba(0,0,0,0.12)] z-3 border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" 
                alt="Equipo ALL CRM" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Image 3: Mobile Experience (Center Right - Foreground) */}
            <motion.div
              initial={{ opacity: 0, x: 70, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-[15%] right-[2%] w-[58%] h-[260px] lg:h-[320px] bg-[#D1D5DB] shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-4 border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600" 
                alt="ALL CRM Mobile" 
                className="w-full h-full object-cover" 
              />
              
              {/* Trust Badge */}
              <div className="absolute bottom-6 right-6 bg-[#2B4EFF] text-white p-4 lg:p-6 shadow-[0_10px_25px_rgba(43,78,255,0.4)] z-10 border border-white/20">
                <div className="text-xl lg:text-2xl font-black leading-none">99.9%</div>
                <div className="text-[10px] uppercase font-bold tracking-widest mt-1">Uptime Real</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-[2px] bg-[#2B4EFF]" />
               <span className="text-[12px] font-black text-[#2B4EFF] uppercase tracking-[0.4em]">
                  El Futuro de la Gestión
               </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-[#1A1F3C] leading-[1.1] tracking-tightest mb-8">
              Control Total <br />
              <span className="text-[#2B4EFF]">en un solo lugar.</span>
            </h2>
            
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-[540px]">
              En ALL CRM, hemos transformado la complejidad empresarial en una experiencia intuitiva y potente. Nuestra plataforma no solo organiza tus datos, sino que impulsa el crecimiento de tu negocio con tecnología de vanguardia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4">
                <div className="text-[#2B4EFF] shrink-0"><ShieldCheck size={28} /></div>
                <div>
                  <h4 className="font-extrabold text-[#111827] text-base">Seguridad Bancaria</h4>
                  <p className="text-sm text-gray-400">Tus datos protegidos con los más altos estándares.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#2B4EFF] shrink-0"><Zap size={28} /></div>
                <div>
                  <h4 className="font-extrabold text-[#111827] text-base">Agilidad Extrema</h4>
                  <p className="text-sm text-gray-400">Interfaz optimizada para máxima productividad.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap items-center">
              <button 
                className="bg-black text-white px-8 lg:px-10 py-5 text-[13px] font-black uppercase tracking-widest hover:bg-[#2B4EFF] transition-all duration-300 shadow-xl"
              >
                Solicitar Demo
              </button>
              <div className="flex items-center gap-2 text-[#2B4EFF] font-black text-sm cursor-pointer hover:underline">
                Explorar Dashboard <LayoutDashboard size={18} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

