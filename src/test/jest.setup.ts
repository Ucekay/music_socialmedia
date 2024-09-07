import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '"https://kuipswqwsrdwkjwyplwv.supabase.co"';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aXBzd3F3c3Jkd2tqd3lwbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2ODU5MzUsImV4cCI6MjAzMzI2MTkzNX0.sLRv71ZoT7ZS9mWiIOqhchEK2iStBkjG_DHZC7PwAew';

(globalThis as any).supabase = createClient(supabaseUrl, supabaseKey);

// テスト前にSupabaseのテーブルをクリアするなど
beforeAll(async () => {
	await (globalThis as any).supabase.from('your_table_name').delete().cascade();
});

afterAll(async () => {
	// テスト後のクリーンアップ処理
});
