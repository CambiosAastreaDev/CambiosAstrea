import { createClient } from '../../utils/supabase/server';

export interface ExchangeRate {
  id: string;
  currency_pair: string;
  rate: number;
  updated_at: string;
}

export async function getExchangeRates(): Promise<ExchangeRate[]> {
  const supabase = await createClient(); // Usamos el cliente SSR
  
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .order('currency_pair', { ascending: true });

  if (error) {
    console.error('Error fetching rates:', error);
    return [];
  }

  return data as ExchangeRate[];
}