
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgzftnoubjfcjsnjfqbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnemZ0bm91YmpmY2pzbmpmcWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTUzNTgsImV4cCI6MjA2NzIzMTM1OH0._Abzsg7TRmKyFZq5EuiqO-xZqXGVic6YWoBV1M9Fu7c'; // sua chave pública

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
