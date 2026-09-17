'use client';

import { useState } from 'react';
import { ExchangeRate } from '../services/rates';
import { Calculator as CalcIcon, ArrowDownUp, Send } from 'lucide-react';

interface CalculatorProps {
  rates: ExchangeRate[];
}

export default function Calculator({ rates }: CalculatorProps) {
  const [selectedPair, setSelectedPair] = useState(rates[0]?.currency_pair || 'USD -> VES');
  const [amount, setAmount] = useState('1000');

  const currentRateObj = rates.find(r => r.currency_pair === selectedPair) || rates[0];
  const rateValue = currentRateObj?.rate || 1;

  const isCopToVes = selectedPair === 'COP -> VES';
  
  let calculatedResult = 0;
  if (isCopToVes) {
    calculatedResult = (parseFloat(amount || '0') / 1000) * rateValue;
  } else {
    calculatedResult = parseFloat(amount || '0') * rateValue;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Selector de Par */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-semibold">
          Seleccionar Operación de Cambio
        </label>
        <div className="relative">
          <select 
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="w-full bg-[#0B132B] border border-[#1E2D52] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer"
          >
            {rates.map((r) => (
              <option key={r.id} value={r.currency_pair} className="bg-[#111C3A] text-white">
                {r.currency_pair} {r.currency_pair === 'COP -> VES' ? '(Cálculo por cada 1,000 Pesos)' : ''}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {/* Grid de Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-semibold">
            {isCopToVes ? 'Monto en Pesos (COP)' : 'Monto a Enviar'}
          </label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#0B132B] border border-[#1E2D52] rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-[#D4AF37] transition-all shadow-inner"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-semibold">
            Monto a Recibir (Aprox)
          </label>
          <div className="w-full bg-[#0B132B]/90 border border-[#D4AF37]/50 rounded-xl px-4 py-3 text-[#D4AF37] font-mono font-bold text-lg shadow-inner flex items-center justify-between">
            <span>{calculatedResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-xs font-sans text-slate-400 font-normal">Final</span>
          </div>
        </div>
      </div>

      {/* Barra de Tasa Activa Informativa */}
      <div className="bg-[#0B132B] border border-[#1E2D52] rounded-xl p-3.5 text-xs text-slate-300 flex justify-between items-center shadow-sm">
        <span className="text-slate-400">Tasa de cambio aplicada:</span>
        <span className="font-mono text-[#D4AF37] font-bold text-sm">{rateValue}</span>
      </div>

      {/* Botón CTA Principal hacia WhatsApp con contraste elevado */}
      <a 
         href="https://w.app/cambiosastrea" 
         target="_blank" 
         rel="noopener noreferrer"
         className="mt-2 w-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(34,197,94,0.35)] transform hover:-translate-y-0.5"
        >
         {/* Icono y texto */}
         Iniciar Cambio por WhatsApp
        </a>
    </div>
  );
}