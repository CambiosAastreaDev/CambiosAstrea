import Navbar from './src/components/Navbar';
import RatesBoard from './src/components/RatesBoard';
import Calculator from './src/components/Calculator';
import { getExchangeRates } from './src/services/rates';
import { CreditCard, Building2, Smartphone, Wallet, Calculator as CalculatorIcon, Zap, Award } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function HomePage() {
  const rates = await getExchangeRates();

  return (
    <main className="min-h-screen flex flex-col bg-[#0B132B] text-slate-200">
      <Navbar />
      
      <section id="calculator" className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
        
        {/* Banner de Bienvenida / Confianza superior */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          {/* Si ya pusiste tu logo en la carpeta public, puedes descomentar la siguiente línea: */}
          {/* <Image src="/logo.png" alt="Cambios Astrea" width={60} height={60} className="mb-2 object-contain" /> */}

          <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] bg-[#111C3A] border border-[#1E2D52] px-4 py-1.5 rounded-full w-max shadow-sm">
            Casa de Cambio Oficial y Segura
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tasas en Tiempo Real y <span className="text-[#D4AF37]">Cambios Inmediatos</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Realiza tus operaciones de forma rápida, transparente y con el mejor respaldo del mercado.
          </p>
        </div>

        {/* Contenedor Superior: Tasas y Calculadora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <RatesBoard rates={rates} />
          
          <div className="bg-[#111C3A] border border-[#1E2D52] rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>
            <h2 className="text-xl font-bold text-white mb-6 tracking-wide flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0B132B] border border-[#1E2D52] flex items-center justify-center text-[#D4AF37]">
                <CalculatorIcon className="w-4 h-4" />
              </div>
              Calculadora Rápida
            </h2>
            <Calculator rates={rates} />
          </div>
        </div>

        {/* Sección de Plataformas de Pago */}
        <div className="w-full mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              Plataformas de Pago Soportadas
            </h3>
            <span className="text-xs text-slate-400">Pagos seguros y verificados</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'Bancolombia', icon: Building2, color: 'text-amber-400' },
              { name: 'NEQUI', icon: Smartphone, color: 'text-purple-400' },
              { name: 'Pago Móvil', icon: Zap, color: 'text-cyan-400' },
              { name: 'Zinly', icon: Wallet, color: 'text-emerald-400' },
              { name: 'Mercantil', icon: Award, color: 'text-blue-400' }
            ].map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div 
                  key={platform.name} 
                  className="bg-[#111C3A] border border-[#1E2D52] hover:border-[#D4AF37]/65 transition-all duration-300 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg group cursor-default gap-2.5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-[#0B132B] border border-[#1E2D52] flex items-center justify-center ${platform.color} group-hover:scale-110 group-hover:border-[#D4AF37]/40 transition-all shadow-inner`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-slate-200 font-semibold text-xs tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {platform.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Footer minimalista institucional */}
      <footer className="w-full border-t border-[#1E2D52] bg-[#111C3A] py-8 mt-16 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Cambios Astrea. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}