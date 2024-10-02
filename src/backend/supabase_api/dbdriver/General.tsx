import { supabase } from '../../lib/supabase';

import type { Database } from '../../schema/supabasetypes';

export type GeneralDB = Database['public']['Tables']['general']['Insert'];

export type CreateGeneralParams = Omit<GeneralDB, 'likes' | 'view'>;

export type UpdateGeneralParams = Omit<
  Database['public']['Tables']['general']['Update'],
  'article_id' | 'user_id'
  >;

export type GetGeneralDetailRes = Omit<
  Database['public']['Tables']['general']['Row'],
  'article_id' | 'user_id'
>;

export class General {
  private readonly tableName: string = 'general';

  //データ挿入関数
  public async createData(
    createData: CreateGeneralParams
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .insert({ ...createData });

      if (error) {
        throw new Error('データの挿入エラー: ' + error.message);
      }

      return true;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  //データ削除関数
  public async deleteData(
    articleId: number,
    userId: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName)
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
  }

  //データ更新関数
  public async updateData(
    articleId: number,
    updateData: Partial<UpdateGeneralParams>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ ...updateData })
        .eq('article_id', articleId);

      if (error) {
        throw new Error('データの更新エラー: ' + error.message);
      }

      return true;
    } catch (error) {
      console.error('データの更新中にエラーが発生しました:', error);
      throw error;
    }
  }

  //データ取得関数
  public async getData(
    articleId: number
  ): Promise<GetGeneralDetailRes | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('article_id', articleId)
        .single();
      
      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }
      return data;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
}

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
  Data: Partial<UpdateGeneralParams>,
): Promise<boolean> => {
  try {

    const { error } = await supabase
      .from('general')
      .update({ ...Data })
      .eq('article_id', articleId)

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
  articleId: number
): Promise<GetGeneralDetailRes| null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('general') 
      .select('*')
      .eq('article_id', articleId )
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    return data;
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
