import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        astrea: {
          bg: '#0B132B',      // Azul marino muy oscuro (Fondo principal)
          card: '#111C3A',    // Azul un poco más claro (Fondo de tarjetas)
          border: '#1E2D52',  // Bordes sutiles
          gold: '#D4AF37',    // Dorado para logos y acentos
          green: '#22C55E',   // Verde para botones de acción (WhatsApp)
        }
      },
    },
  },
  plugins: [],
};
export default config;