'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0C1220', color: '#FFFFFF', fontFamily: 'Outfit, Inter, system-ui, sans-serif', overflowX: 'hidden' }}>

      {/* ─── HERO — Dark Immersive ─── */}
      <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '80px', textAlign: 'center', overflow: 'hidden' }}>
        {/* Ambient Glow */}
        <div style={{ position: 'absolute', top: '-20%', left: '30%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(0,209,200,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '30%', height: '40%', background: 'radial-gradient(circle, rgba(43,78,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: 'inline-block', padding: '6px 20px', borderRadius: '100px', background: 'rgba(0,209,200,0.1)', color: '#00D1C8', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', border: '1px solid rgba(0,209,200,0.2)', marginBottom: '40px' }}>
              Control Total, Alivio Real
            </span>
          </motion.div>

          {/* Logo — The Real ALL Brand */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
              <Image
                src="/images/all-logo-glass.png"
                alt="ALL — Control Total, Alivio Real"
                width={300}
                height={300}
                priority
                style={{ objectFit: 'contain', mixBlendMode: 'lighten', filter: 'drop-shadow(0 0 80px rgba(0,209,200,0.12))' }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '24px', color: '#FFFFFF' }}>
            El sistema operativo de tu{' '}
            <span style={{ background: 'linear-gradient(135deg, #00D1C8, #2B4EFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              empresa de servicios.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 400 }}>
            Gestiona proyectos, clientes, inventario y facturación desde una única plataforma diseñada para escalar tu negocio.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: 'linear-gradient(135deg, #00D1C8, #2B4EFF)', color: '#FFFFFF', fontSize: '16px', fontWeight: 700, borderRadius: '14px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,209,200,0.25)' }}>
              Ingresar al CRM
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES — Alternating Rows ─── */}
      <section id="caracteristicas" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px', color: '#FFFFFF' }}>
            Todo lo que necesitas,<br/>sin la complejidad.
          </h2>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', fontWeight: 400, maxWidth: '600px', margin: '0 auto' }}>
            Módulos diseñados para trabajar en perfecta sincronía y llevar tu operación al siguiente nivel.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Feature 1 — Proyectos */}
          <div className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,209,200,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D1C8" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Gestión de Proyectos</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '400px' }}>
                Controla cada fase de tus obras y servicios en tiempo real. Asigna equipos, define presupuestos, adjunta fotos directamente desde tu celular y mantén todo organizado en un solo lugar.
              </p>
            </div>
            <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src="/images/app_proyectos.png" alt="Proyectos" width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Feature 2 — Cotizaciones (Reversed) */}
          <div className="feature-row reverse" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '40px', background: 'linear-gradient(135deg, rgba(43,78,255,0.08), transparent)', border: '1px solid rgba(43,78,255,0.15)', borderRadius: '24px', padding: '40px', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(43,78,255,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6685FF" strokeWidth="2.5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Cotizaciones Profesionales</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '400px' }}>
                Olvídate del Word y Excel. Genera propuestas comerciales impactantes, hermosos PDFs interactivos y envíalos a tus clientes con un solo clic. Agrega materiales e IVA de forma automatizada.
              </p>
            </div>
            <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src="/images/app_cotizaciones.png" alt="Cotizaciones PRO" width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Feature 3 — Inventario */}
          <div className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,209,200,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D1C8" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Inventario Inteligente</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '400px' }}>
                Mantiene tus herramientas y suministros bajo control estricto. Registra salidas hacia proyectos específicos, gestiona proveedores y dile adiós a las mermas no justificadas.
              </p>
            </div>
            <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src="/images/app_inventario.png" alt="Inventario" width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Feature 4 — Calendario (Reversed) */}
          <div className="feature-row reverse" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '40px', background: 'linear-gradient(135deg, rgba(0,209,200,0.08), rgba(43,78,255,0.08))', border: '1px solid rgba(0,209,200,0.15)', borderRadius: '24px', padding: '40px', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(43,78,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B4EFF" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Calendario Maestro</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '400px' }}>
                Visualiza toda la carga de trabajo de tu empresa en un solo lugar. Programa mantenimientos, delega tareas a técnicos y asegura que ningún cliente se quede sin atención.
              </p>
            </div>
            <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src="/images/app_calendario.png" alt="Calendario Maestro" width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '32px', color: '#FFFFFF' }}>
          ¿Listo para dar el salto?
        </h2>
        <a href="https://wa.me/593963410409?text=Hola%2C%20me%20interesa%20el%20software%20ALL" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 40px', background: 'linear-gradient(135deg, #00D1C8, #2B4EFF)', color: '#FFFFFF', fontSize: '18px', fontWeight: 700, borderRadius: '16px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(0,209,200,0.2)' }}>
          Comenzar ahora
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </section>

      {/* ─── Responsive Grid Fix ─── */}
      <style jsx>{`
        @media (max-width: 768px) {
          .feature-row, .feature-row.reverse {
            flex-direction: column !important;
            text-align: center;
          }
          .feature-row > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </main>
  );
}
