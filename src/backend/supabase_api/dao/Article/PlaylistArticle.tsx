import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { GetGetArticleContent } from './General';
import type { Database } from '../../../schema/supabasetypes';

type PlaylistArticle =
  Database['public']['Tables']['PlaylistArticle']['Insert'];
type UpdateReview = Omit<
  Database['public']['Tables']['PlaylistArticle']['Update'],
  'ArticleID' | 'UserID'
>;
type GetPlaylistArticle = Omit<
  Database['public']['Tables']['PlaylistArticle']['Row'],
  'ArticleID' | 'UserID'
>;

//データ挿入関数
export const insertPlaylistArticle = async (
  Data: Omit<PlaylistArticle, 'ArticleID' | 'UserID' | 'likes' | 'view'>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('PlaylistArticle')
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
export const getPlaylistArticle = async (
  articleId: number,
  userID: string,
): Promise<{
  PlaylistArticleData: GetGetArticleContent;
  LikeToArticle: boolean;
} | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('PlaylistArticle') // テーブル名を修正
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

    return { PlaylistArticleData: data, LikeToArticle: liketoarticle };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
