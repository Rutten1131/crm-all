'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Facturación', href: '/facturacion' },
  { name: 'WhatsApp', href: '/whatsapp' },
  { name: 'Reportes', href: '/reportes' },
  { name: 'Planes', href: '/planes' },
  { name: 'Soporte', href: '/soporte' },
  { name: 'Demo', href: '/demo' },
  { name: 'Blog', href: '/blog' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-links-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 28px 12px;
          flex-wrap: nowrap;
          text-align: center;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          flex: 1;
          min-width: 0;
        }
        .footer-col span {
          font-size: 10px !important;
          font-weight: 800;
          color: #1d1d1f;
          text-transform: uppercase;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .footer-sublink {
          font-size: 11px !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        @media (min-width: 1024px) {
          .footer-links-row {
            justify-content: center;
            gap: 80px;
            text-align: left;
            padding: 28px 40px;
          }
          .footer-col {
            align-items: flex-start;
            flex: none;
          }
          .footer-col span {
            font-size: 12px !important;
            letter-spacing: 0.08em;
          }
          .footer-sublink {
            font-size: 13px !important;
          }
        }
      `}} />
    <footer style={{ backgroundColor: '#fff', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '40px', paddingBottom: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Navigation row — centered */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0px', paddingBottom: '24px' }}>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{ fontSize: '13px', fontWeight: 600, color: '#424245', padding: '8px 16px', textDecoration: 'none', whiteSpace: 'nowrap' }}
              className="hover:text-[#00D1C8] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />

        {/* Agencias + Síguenos row - ULTRA COMPACT GROUP */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="footer-links-row" style={{ gap: '30px', justifyContent: 'center' }}>
            
            {/* Agencias */}
            <div className="footer-col" style={{ flex: 'none' }}>
              <span>Agencias</span>
              <Link href="/agencias" className="footer-sublink hover:text-[#00D1C8] transition-colors" style={{ color: '#424245', textDecoration: 'none' }}>
                Encuéntranos
              </Link>
            </div>

            {/* Síguenos */}
            <div className="footer-col" style={{ flex: 'none' }}>
              <span>Síguenos</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link 
                  href="https://www.facebook.com/allcrm" 
                  target="_blank" 
                  style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#424245', textDecoration: 'none' }} 
                  className="footer-sublink hover:text-[#2B4EFF] transition-colors"
                >
                  FB <ExternalLink size={10} />
                </Link>
                <Link 
                  href="https://www.instagram.com/allcrm_ec/" 
                  target="_blank" 
                  style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#424245', textDecoration: 'none' }} 
                  className="footer-sublink hover:text-[#2B4EFF] transition-colors"
                >
                  IG <ExternalLink size={10} />
                </Link>
              </div>
            </div>

            {/* ALL */}
            <div className="footer-col" style={{ flex: 'none' }}>
              <span>ALL CRM</span>
              <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
                <Link href="/nosotros" className="footer-sublink hover:text-[#2B4EFF] transition-colors" style={{ color: '#424245', textDecoration: 'none' }}>Nosotros</Link>
                <Link href="/preguntas" className="footer-sublink hover:text-[#2B4EFF] transition-colors" style={{ color: '#424245', textDecoration: 'none' }}>FAQ</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />

        {/* Logo + Brand + Legal */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingTop: '24px' }}>
          
          {/* Logo + Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' }}>
            <div style={{ position: 'relative', width: '22px', height: '22px', overflow: 'hidden', backgroundColor: '#2B4EFF', borderRadius: '4px', padding: '2px' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: '900' }}>ALL</div>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              ALL CRM
            </span>
          </Link>

          {/* Copyright */}
          <p style={{ fontSize: '11px', color: '#86868b', fontWeight: 400, margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
            © {year} ALL CRM Ecuador. Todos los derechos reservados.
          </p>

          {/* Designer Credit */}
          <p style={{ fontSize: '10px', color: '#B0B0B5', fontWeight: 500, margin: 0, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Powered by <Link href="/" style={{ color: '#2B4EFF', textDecoration: 'none' }} className="hover:underline">ALL Technology</Link> | {year}
          </p>

          {/* Legal Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/privacidad" style={{ fontSize: '12px', color: '#86868b', textDecoration: 'none' }} className="hover:text-[#00D1C8] transition-colors">Privacidad</Link>
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>|</span>
            <Link href="/legal" style={{ fontSize: '12px', color: '#86868b', textDecoration: 'none' }} className="hover:text-[#00D1C8] transition-colors">Legal</Link>
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>|</span>
            <Link href="/mapa" style={{ fontSize: '12px', color: '#86868b', textDecoration: 'none' }} className="hover:text-[#00D1C8] transition-colors">Mapa del Sitio</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
