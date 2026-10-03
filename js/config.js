// Paste your values from Supabase → Project Settings → API.
// The anon key is safe in the browser because Row Level Security (see supabase/schema.sql) limits what it can do.
const SUPABASE_URL = 'https://tldabolvqdtlylgwpgst.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZGFib2x2cWR0bHlsZ3dwZ3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNTIwMzIsImV4cCI6MjEwNjYyODAzMn0.eFyW_do1SIBbL4NrVln8QLBJnM1HedeQzc423L1n4RY';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
