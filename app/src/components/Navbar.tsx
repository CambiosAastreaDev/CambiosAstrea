'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowLeftRight, ShieldCheck, HelpCircle } from 'lucide-react';
import logo from '../../../public/CAMBIOSASTREA.jpeg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#1E2D52] bg-[#0B132B]/90 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Real Integrado */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#1E2D52] bg-[#111C3A] shadow-md group-hover:border-[#D4AF37]/60 transition-colors">
            <Image 
              src={logo} 
              alt="Cambios Astrea Logo" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-widest text-white leading-none">CAMBIOS</span>
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] mt-1">ASTREA</span>
          </div>
        </Link>

        {/* Links (Desktop) */}
        <nav className="hidden md:flex gap-8 text-sm text-slate-300 font-medium items-center">
          <Link href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><ArrowLeftRight className="w-4 h-4 text-[#D4AF37]" /> Servicios</Link>
          <Link href="#" className="text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-1">Tasa del Día</Link>
          <Link href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Seguridad</Link>
          <Link href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> Ayuda</Link>
        </nav>

        {/* CTA rápido superior */}
        <div className="hidden md:block">
          <a href="#calculator" className="text-xs font-bold bg-[#111C3A] border border-[#1E2D52] hover:border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-xl transition-all shadow-sm">
            Cotizar Rápido
          </a>
        </div>

        {/* Botón Menú Hamburguesa (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-[#D4AF37] focus:outline-none p-2 bg-[#111C3A] border border-[#1E2D52] rounded-xl"
          aria-label="Menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Desplegable (Mobile) con transiciones limpias */}
      {isOpen && (
        <div className="md:hidden bg-[#111C3A] border-b border-[#1E2D52] px-6 py-6 flex flex-col gap-4 shadow-2xl animate-fadeIn">
          <Link href="#" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-[#D4AF37] transition-colors text-sm font-medium py-2 border-b border-[#1E2D52]/50 flex items-center gap-2"><ArrowLeftRight className="w-4 h-4 text-[#D4AF37]" /> Servicios</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="text-[#D4AF37] text-sm font-semibold py-2 border-b border-[#1E2D52]/50">Tasa del Día</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-[#D4AF37] transition-colors text-sm font-medium py-2 border-b border-[#1E2D52]/50 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Seguridad</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-[#D4AF37] transition-colors text-sm font-medium py-2 flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Ayuda</Link>
        </div>
      )}
    </header>
  );
}