import { ExchangeRate } from '../services/rates';
import { TrendingUp, RefreshCw, DollarSign, Euro, ArrowRightLeft } from 'lucide-react';

export default function RatesBoard({ rates }: { rates: ExchangeRate[] }) {
  const getCurrencyIcon = (pair: string) => {
    if (pair.includes('EUR')) return <Euro className="w-5 h-5 text-[#D4AF37]" />;
    if (pair.includes('COP')) return <ArrowRightLeft className="w-5 h-5 text-emerald-400" />;
    return <DollarSign className="w-5 h-5 text-[#D4AF37]" />;
  };

  return (
    <div className="bg-[#111C3A] border border-[#1E2D52] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Línea de brillo superior característica de la marca */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1E2D52]">
        <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0B132B] border border-[#1E2D52] flex items-center justify-center text-[#D4AF37]">
            <TrendingUp className="w-4 h-4" />
          </div>
          Tasa del Día
        </h2>
        <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5 bg-[#0B132B] px-3 py-1.5 rounded-full border border-[#1E2D52] shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Actualizado
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {rates.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
            Cargando tasas del mercado...
          </div>
        ) : (
          rates.map((rate, index) => (
            <div 
              key={rate.id} 
              className={`flex justify-between items-center p-3.5 rounded-xl transition-all duration-300 bg-[#0B132B]/40 hover:bg-[#0B132B] border border-transparent hover:border-[#1E2D52] ${
                index !== rates.length - 1 ? 'border-b border-[#1E2D52]/40' : ''
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl border border-[#1E2D52] bg-[#0B132B] flex items-center justify-center shadow-md">
                  {getCurrencyIcon(rate.currency_pair)}
                </div>
                <div>
                  <span className="font-bold text-base tracking-wider text-white block">
                    {rate.currency_pair}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Mercado Oficial Astrea</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl sm:text-2xl text-[#D4AF37] font-mono font-bold tracking-tight">
                  {rate.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Ref base
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}