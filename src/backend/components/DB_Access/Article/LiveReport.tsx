import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { Database } from '../../../types/supabasetypes';
import type { GetGetArticleContent } from './General';

type LiveReport = Database['public']['Tables']['LiveReport']['Insert'];
type UpdateLiveReport = Omit<
  Database['public']['Tables']['LiveReport']['Update'],
  'ArticleID' | 'UserID'
>;
type GetLiveReport = Omit<
  Database['public']['Tables']['LiveReport']['Row'],
  'ArticleID' | 'UserID'
>;

//データ挿入関数
export const insertLiveReport = async (
  Data: Omit<LiveReport, 'LiveReportID' | 'UserID' | 'likes' | 'view'>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('Livereport')
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

//データ削除関数
export const deleteLiveReport = async (articleId: number): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('LiveReport')
      .delete()
      .match({ ArticleID: articleId, UserID: userId });

    if (error) {
      throw new Error('データの削除エラー: ' + error.message);
    }

    return true;
  } catch (error) {
    console.error('データの削除中にエラーが発生しました:', error);
    throw error;
  }
};

//データ取得関数
export const getLiveReport = async (
  articleId: number,
  userID: string,
): Promise<{
  LiveReportData: GetGetArticleContent;
  LikeToArticle: boolean;
} | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('LiveReport') // テーブル名を修正
      .select('*')
      .match({ ArticleID: articleId })
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    let liketoarticle = true;
    try {
      const { data: Like, error: likeerror } = await supabase
        .from('ArticleLikes')
        .select('PostID')
        .eq('UserID', userID)
        .eq('PostID', articleId)
        .single();
    } catch (likeerror) {
      liketoarticle = false;
    }
    if (error) {
      throw error;
    }

    return { LiveReportData: data, LikeToArticle: liketoarticle };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
