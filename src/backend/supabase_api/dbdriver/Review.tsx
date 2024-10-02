import { supabase } from '../../lib/supabase';

import type { Database } from '../../schema/supabasetypes';

export type ReviewDB = Database['public']['Tables']['review']['Insert'];

export type CreateReviewParams = Omit<ReviewDB, 'likes' | 'view'>;

export type UpdateReviewParams = Omit<
  Database['public']['Tables']['review']['Update'],
  'article_id' | 'user_id'
>;
export type GetReviewDetailRes = Omit<
  Database['public']['Tables']['review']['Row'],
  'article_id' | 'user_id'
  >;

export class Review {
  private readonly tableName: string = 'review';

  //データ挿入関数
  public async createData(
    createData: CreateReviewParams
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
    updateData: Partial<UpdateReviewParams>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ ...updateData })
        .match({ article_id: articleId });

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
  ): Promise<GetReviewDetailRes | null> {
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
export const CreateReview = async (
  Data: CreateReviewParams,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('review')
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
export const DeleteReview = async (articleId: number, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('review')
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
export const UpdateReview = async(
  articleId: number,
  Data: Partial<UpdateReviewParams>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('review')
      .update({ ...Data })
      .match({ article_id: articleId });

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
export const GetReview = async (
  articleId: number
): Promise<GetReviewDetailRes | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('review') // テーブル名を修正
      .select('*')
      .eq('article_id', articleId)
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }

    return data
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
