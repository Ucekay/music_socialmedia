import { supabase } from '../../lib/supabase';

const handleSearch = async (
  databaseName: string,
  query: string,
): Promise<any[]> => {
  try {
    // ワードを空白で分割して配列にする
    const searchWords = query.split(' ');

    // 検索クエリを構築する
    const searchQuery = `to_tsvector('japanese', name) @@ to_tsquery('japanese', '(${searchWords.join(' & ')})')`;

    // Supabaseから検索結果を取得する
    const { data, error } = await supabase
      .from(databaseName)
      .select('*')
      .textSearch('name', searchQuery, { config: 'japanese' })
      .limit(100);

    if (error) {
      console.error('Search error:', error);
      return []; // エラーが発生した場合は空の配列を返す
    }

    return data; // 検索結果を返す
  } catch (error) {
    console.error('Search error:', error);
    return []; // エラーが発生した場合は空の配列を返す
  }
};

export default handleSearch;
