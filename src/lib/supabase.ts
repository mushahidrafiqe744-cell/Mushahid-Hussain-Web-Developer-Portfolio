import { createClient } from '@supabase/supabase-js';

// Robust lookup for Supabase credentials (Vite env, define replacement, or fallback)
const getEnv = (key: string): string => {
  try {
    return (import.meta.env[key] as string) || (process.env[key] as string) || '';
  } catch (e) {
    return (process.env[key] as string) || '';
  }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Clean up keys (remove accidental quotes or whitespace)
const cleanUrl = supabaseUrl?.trim().replace(/^['"](.*)['"]$/, '$1') || '';
const cleanKey = supabaseAnonKey?.trim().replace(/^['"](.*)['"]$/, '$1') || '';

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

let supabaseClient = null;

if (cleanUrl && cleanKey && isValidUrl(cleanUrl) && !cleanUrl.includes('YOUR_')) {
  try {
    supabaseClient = createClient(cleanUrl, cleanKey);
  } catch (err) {
    console.error('Supabase initialization failed:', err);
  }
}

export const supabase = supabaseClient;

if (!supabase) {
  console.warn('Supabase credentials are missing or invalid URL. Current URL:', cleanUrl || 'Empty');
}
