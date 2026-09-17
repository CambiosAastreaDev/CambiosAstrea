'use client'

import { useState } from 'react'
import { ExchangeRate } from '../services/rates'
import { createClient } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import { RefreshCw, Save, Edit2, X, ArrowLeftRight } from 'lucide-react'

export default function AdminRatesClient({ initialRates }: { initialRates: ExchangeRate[] }) {
  const [rates, setRates] = useState<ExchangeRate[]>(initialRates)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const startEdit = (rate: ExchangeRate) => {
    setEditingId(rate.id)
    setEditValue(rate.rate.toString())
  }

  const saveRate = async (id: string) => {
    setLoading(true)
    const newRate = parseFloat(editValue)

    if (isNaN(newRate) || newRate <= 0) {
      alert('Por favor ingresa un número válido mayor a 0')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('exchange_rates')
      .update({ rate: newRate, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      setRates(rates.map(r => r.id === id ? { ...r, rate: newRate } : r))
      setEditingId(null)
      router.refresh()
    } else {
      alert('Error al guardar la tasa en la base de datos')
    }
    setLoading(false)
  }

  // Función para obtener la representación inversa del par (Ej: USD -> VES pasa a VES -> USD)
  const getInvertedPairText = (pair: string) => {
    const parts = pair.split('->').map(p => p.trim())
    if (parts.length === 2) {
      return `${parts[1]} -> ${parts[0]}`
    }
    return pair
  }

  return (
    <div className="bg-[#111C3A] border border-[#1E2D52] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1E2D52]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Gestión de Tasas Oficiales</h2>
          <p className="text-xs text-slate-400 mt-0.5">Modifica los valores base; las tasas inversas se calculan en tiempo real.</p>
        </div>
        <span className="text-xs text-[#D4AF37] bg-[#0B132B] px-3 py-1.5 rounded-full border border-[#1E2D52] font-mono">
          Total: {rates.length} pares
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-3 border-b border-[#1E2D52] text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <div>Par Directo (BD)</div>
        <div>Tasa Editable (Directa)</div>
        <div>Tasa Inversa Calculada</div>
        <div className="text-right">Acción</div>
      </div>

      <div className="flex flex-col mt-2 divide-y divide-[#1E2D52]/40">
        {rates.map((rate) => {
          const invertedPair = getInvertedPairText(rate.currency_pair)
          // En AdminRatesClient.tsx
            const invertedRate = rate.rate > 0 ? ((1 / rate.rate) * 1.05) : 0;

          return (
            <div key={rate.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-4 hover:bg-[#0B132B]/30 px-3 rounded-xl transition-colors">
              
              {/* Par Directo */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide">{rate.currency_pair}</span>
              </div>
              
              {/* Tasa Directa (Editable) */}
              <div>
                {editingId === rate.id ? (
                  <input
                    type="number"
                    step="any"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full bg-[#0B132B] border border-[#D4AF37] rounded-xl px-3 py-1.5 text-white focus:outline-none font-mono text-sm shadow-inner"
                    autoFocus
                  />
                ) : (
                  <span className="text-base text-[#D4AF37] font-mono font-bold">
                    {rate.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                  </span>
                )}
              </div>

              {/* Tasa Inversa Automática con Margen */}
            <div className="flex flex-col">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <ArrowLeftRight className="w-3 h-3 text-emerald-400" /> {invertedPair}
            </span>
            <span className="text-sm text-[#D4AF37] font-mono font-bold">
                {invertedRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: invertedRate < 1 ? 6 : 2 })}
                <span className="text-[10px] text-emerald-400 ml-1.5 font-normal"></span>
            </span>
            </div>

              {/* Botones de Acción */}
              <div className="text-right">
                {editingId === rate.id ? (
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setEditingId(null)} 
                      className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Cancelar
                    </button>
                    <button 
                      onClick={() => saveRate(rate.id)} 
                      disabled={loading} 
                      className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1"
                    >
                      {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Guardar
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => startEdit(rate)} 
                    className="px-4 py-1.5 text-xs bg-[#0B132B] border border-[#1E2D52] hover:border-[#D4AF37] text-slate-300 hover:text-[#D4AF37] rounded-xl transition-all shadow-sm flex items-center gap-1.5 ml-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Editar Tasa
                  </button>
                )}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}