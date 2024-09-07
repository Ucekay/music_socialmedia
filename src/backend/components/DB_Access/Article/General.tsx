import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { Database } from '../../../types/supabasetypes';

type General = Database['public']['Tables']['General']['Insert'];
type UpdateGeneral = Omit<
  Database['public']['Tables']['General']['Update'],
  'ArticleID' | 'UserID'
>;
export type GetGetArticleContent = Omit<
  Database['public']['Tables']['General']['Row'],
  'ArticleID' | 'UserID'
>;

//データ挿入関数
export const insertGeneral = async (
  Data: Omit<General, 'ArticleID' | 'UserID' | 'likes' | 'view'>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('General')
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
export const deleteGeneral = async (articleId: number): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('General')
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

//データ更新関数
export const updateGeneral = async (
  articleId: number,
  updateData: Partial<UpdateGeneral>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();

    const { data, error } = await supabase
      .from('General')
      .update(updateData)
      .match({ ArticleID: articleId, UserID: userId });

    if (error) {
      throw new Error('データの更新エラー: ' + error.message);
    }

    return true;
  } catch (error) {
    console.error('データの更新中にエラーが発生しました:', error);
    throw error;
  }
};

//データ取得関数
export const getGeneral = async (
  articleId: number,
  userID: string,
): Promise<{
  GeneralData: GetGetArticleContent;
  LikeToArticle: boolean;
} | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('General') // テーブル名を修正
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

    return { GeneralData: data, LikeToArticle: liketoarticle };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

//url作成関数
/*
export const createURL = async(articleId:number): Promise<string>=>{
  try{
    const userId = await checkAuth();
    const articleUrl = `https://your-app.com/article/${articleId}`;

    const { data, error } = await supabase
     .from('Article')
     .update({url:articleUrl})
     .match({ ArticleID: articleId, UserID: userId })
     .single();
     if (error) {
      throw new Error('urlの作成エラー: ' + error.message);
    }

    return data; 
  } catch (error) {
    console.error('urlの作成中にエラーが発生しました:', error);
    throw error;

  }
}
*/
