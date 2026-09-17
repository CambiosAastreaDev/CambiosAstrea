import { login } from '../actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-astrea-card border border-astrea-border rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest">
            Cambios <span className="text-astrea-gold">Astrea</span>
          </h1>
          <p className="text-slate-400 mt-2">Panel de Administración</p>
        </div>

        <form action={login} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-slate-400 mb-1" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-astrea-bg border border-astrea-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-astrea-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1" htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-astrea-bg border border-astrea-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-astrea-gold transition-colors"
            />
          </div>

          {searchParams?.error && (
            <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md border border-red-500/20">
              {searchParams.error}
            </p>
          )}

          <button type="submit" className="w-full bg-astrea-gold hover:bg-yellow-600 text-astrea-bg font-bold py-3 rounded-md transition-colors mt-2">
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  )
}