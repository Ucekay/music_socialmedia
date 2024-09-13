import { supabase } from '../../lib/supabase';

import { checkAuth } from './checkAuth';

import type { Database } from '../../schema/supabasetypes';

type TodaysSong = Database['public']['Tables']['TodaysSong']['Insert'];
type GetTodaysSong = Database['public']['Tables']['TodaysSong']['Row'];

//データ挿入関数
export const insertTodaysSongs = async (
  Data: Omit<
    TodaysSong,
    'TodaysSongID' | 'UserID' | 'likes' | 'view' | 'created_at'
  >,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('TodaysSong')
      .insert({ ...Data, UserID: userId });

    if (error) {
      throw new Error('データの挿入エラー: ' + error.message);
    }

    return true;
  } catch (error) {
    console.error('データの挿入中にエラーが発生しました:', error);
    throw error;
  }
};

//データ取得関数
export const getInitialTodaysSongs = async (): Promise<{
  TodaysSongs: GetTodaysSong[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const LIMIT = 10;
    const { data: TodaysSongs, error } = await supabase // UserIDによる絞り込みを削除
      .from('TodaysSongs') // テーブル名を修正
      .select('*')
      .order('created_at', { ascending: false })
      .limit(LIMIT);

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    const cursor =
      TodaysSongs.length > 0
        ? TodaysSongs[TodaysSongs.length - 1].created_at
        : null;
    const latestcursor =
      TodaysSongs.length > 0 ? TodaysSongs[0].created_at : null;

    return { TodaysSongs, cursor, latestcursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getOlderTodaysSongs = async (
  cursor: string,
): Promise<{ TodaysSongs: GetTodaysSong[]; cursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextTodaysSongs, error } = await supabase
      .from('Post')
      .select('*')
      .order('created_at', { ascending: false })
      .lt('created_at', cursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { TodaysSongs: [], cursor: cursor };
    }

    const nextCursor =
      nextTodaysSongs.length > 0
        ? nextTodaysSongs[nextTodaysSongs.length - 1].created_at
        : cursor;

    return { TodaysSongs: nextTodaysSongs, cursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getNewerTodaysSongs = async (
  latestcursor: string,
): Promise<{ TodaysSongs: GetTodaysSong[]; latestcursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextTodaysSongs, error } = await supabase
      .from('Post')
      .select('*')
      .order('created_at', { ascending: false })
      .gt('created_at', latestcursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { TodaysSongs: [], latestcursor: latestcursor };
    }

    const nextCursor =
      nextTodaysSongs.length > 0 ? nextTodaysSongs[0].created_at : latestcursor;

    return { TodaysSongs: nextTodaysSongs, latestcursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
