import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kuipswqwsrdwkjwyplwv.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aXBzd3F3c3Jkd2tqd3lwbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2ODU5MzUsImV4cCI6MjAzMzI2MTkzNX0.sLRv71ZoT7ZS9mWiIOqhchEK2iStBkjG_DHZC7PwAew';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
