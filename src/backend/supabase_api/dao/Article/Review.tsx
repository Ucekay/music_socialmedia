import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { GetGetArticleContent } from './General';
import type { Database } from '../../../schema/supabasetypes';

type Review = Database['public']['Tables']['Review']['Insert'];
type UpdateReview = Omit<
  Database['public']['Tables']['Review']['Update'],
  'ArticleID' | 'UserID'
>;
type Getreview = Omit<
  Database['public']['Tables']['Review']['Row'],
  'ArticleID' | 'UserID'
>;

//データ挿入関数
export const insertReview = async (
  Data: Omit<Review, 'ReviewID' | 'UserID' | 'likes' | 'view'>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('Review')
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
export const getReview = async (
  articleId: number,
  userID: string,
): Promise<{
  ReviewData: GetGetArticleContent;
  LikeToArticle: boolean;
} | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('Review') // テーブル名を修正
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

    return { ReviewData: data, LikeToArticle: liketoarticle };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
