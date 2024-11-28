import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate Supabase URL and key
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or API key. Please check your .env file.');
}

try {
    // Validate URL format
    new URL(supabaseUrl);
} catch (error) {
    throw new Error('Invalid Supabase URL format. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);