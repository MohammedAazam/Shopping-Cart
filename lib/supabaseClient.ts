import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://zqcttvvnaobvjglubkyp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY3R0dnZuYW9idmpnbHVia3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MDkyNzYsImV4cCI6MjA1MDI4NTI3Nn0.CkBs16y1fAS8VBDi5AHvjkU3nZDP6nIZry4y2olFiiU"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
