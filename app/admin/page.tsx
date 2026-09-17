import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { getExchangeRates } from '../src/services/rates'
import AdminRatesClient from '../../app/src/components/AdminRatesClient'
import { logout } from './actions'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Verificamos si el usuario está logueado
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const rates = await getExchangeRates()

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-slate-400 text-sm mt-1">Sesión iniciada como: {user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-red-400 hover:text-red-300 border border-red-900/50 hover:bg-red-900/20 px-4 py-2 rounded-md transition-colors">
            Cerrar Sesión
          </button>
        </form>
      </div>

      <AdminRatesClient initialRates={rates} />
    </div>
  )
}