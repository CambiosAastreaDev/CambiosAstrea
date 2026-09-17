'use client'

import { useState } from 'react'
import { ExchangeRate } from '../../src/services/rates'
import { createClient } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'

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

    const { error } = await supabase
      .from('exchange_rates')
      .update({ rate: newRate, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      setRates(rates.map(r => r.id === id ? { ...r, rate: newRate } : r))
      setEditingId(null)
      router.refresh()
    } else {
      alert('Error al guardar la tasa')
    }
    setLoading(false)
  }

  return (
    <div className="bg-astrea-card border border-astrea-border rounded-xl p-6 shadow-2xl">
      <div className="grid grid-cols-3 gap-4 pb-4 border-b border-astrea-border text-sm font-semibold text-slate-400">
        <div>Par de Monedas</div>
        <div>Tasa Actual</div>
        <div className="text-right">Acción</div>
      </div>

      <div className="flex flex-col mt-2">
        {rates.map((rate) => (
          <div key={rate.id} className="grid grid-cols-3 gap-4 items-center py-4 border-b border-astrea-border/30">
            <div className="font-medium text-white">{rate.currency_pair}</div>
            
            <div>
              {editingId === rate.id ? (
                <input
                  type="number"
                  step="any"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-astrea-bg border border-astrea-gold rounded px-3 py-1 text-white focus:outline-none font-mono"
                />
              ) : (
                <span className="text-lg text-astrea-gold font-mono">{rate.rate}</span>
              )}
            </div>

            <div className="text-right">
              {editingId === rate.id ? (
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingId(null)} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded">Cancelar</button>
                  <button onClick={() => saveRate(rate.id)} disabled={loading} className="px-3 py-1 text-xs bg-astrea-green hover:bg-green-600 text-white rounded font-bold">
                    {loading ? '...' : 'Guardar'}
                  </button>
                </div>
              ) : (
                <button onClick={() => startEdit(rate)} className="px-3 py-1 text-xs border border-astrea-border hover:border-astrea-gold text-slate-300 rounded transition-colors">
                  Editar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}