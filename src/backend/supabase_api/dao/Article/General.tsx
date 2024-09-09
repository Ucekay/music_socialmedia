import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { Database } from '../../../schema/supabasetypes';

type General = Database['public']['Tables']['general']['Insert'];

type CreateGeneralParams = Omit<General, 'likes' | 'view'>;

type UpdateGeneralParams = Omit<
  Database['public']['Tables']['general']['Update'],
  'article_id' | 'user_id'
>;
export type GetGeneralDetailRes = Omit<
  Database['public']['Tables']['general']['Row'],
  'article_id' | 'user_id'
>;

//データ挿入関数
export const CreateGeneral = async (
  Data: CreateGeneralParams
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('general')
      .insert({ ...Data });

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
export const DeleteGeneral = async (articleId: number, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('general')
      .delete()
      .match({ article_id: articleId, user_id: userId });

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
export const UpdateGeneral = async (
  articleId: number,
  userId: string,
  updateData: Partial<UpdateGeneralParams>,
): Promise<boolean> => {
  try {

    const { data, error } = await supabase
      .from('general')
      .update(updateData)
      .match({ article_id: articleId, user_id: userId });

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
export const GetGeneral = async (
  articleId: number,
  userID: string,
): Promise<{
  GeneralData: GetGeneralDetailRes;
  LikeToArticle: boolean;
} | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('general') 
      .select('*')
      .match({ article_id: articleId })
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    let liketoarticle = true;
    try {
      const { data: Like, error: likeerror } = await supabase
        .from('article_likes')
        .select('post_id')
        .eq('user_id', userID)
        .eq('article_id', articleId)
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
