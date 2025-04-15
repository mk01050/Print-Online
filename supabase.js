import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odzlmyuoljzoknzcfkov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kemxteXVvbGp6b2tuemNma292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDcwMDgsImV4cCI6MjA2MDI4MzAwOH0.WmXmixr_rwNcyW-B9czK2Bae-wCgZwIVGfHfgBuuNgo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
