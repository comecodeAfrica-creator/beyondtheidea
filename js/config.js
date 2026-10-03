// Paste your values from Supabase → Project Settings → API.
// The anon key is safe in the browser because Row Level Security (see supabase/schema.sql) limits what it can do.
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
