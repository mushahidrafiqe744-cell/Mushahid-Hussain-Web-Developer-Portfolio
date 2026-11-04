import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Clean up keys (remove accidental quotes or whitespace)
const cleanUrl = supabaseUrl.trim().replace(/^['"](.*)['"]$/, '$1');
const cleanKey = supabaseAnonKey.trim().replace(/^['"](.*)['"]$/, '$1');

export const supabase = (cleanUrl && cleanKey && cleanUrl !== 'YOUR_SUPABASE_PROJECT_URL')
  ? createClient(cleanUrl, cleanKey)
  : null;

if (!supabase) {
  if (!cleanUrl) console.warn('Missing VITE_SUPABASE_URL');
  if (!cleanKey) console.warn('Missing VITE_SUPABASE_ANON_KEY');
  console.warn('Supabase credentials are missing or invalid. Please check your .env file or AI Studio Secrets.');
}
