import { supabase } from '../../lib/supabase';

import type { Database } from '../../schema/supabasetypes';

export type LiveReportDB = Database['public']['Tables']['general']['Insert'];

export type CreateLiveReportParams = Omit<LiveReportDB, 'likes' | 'view'>;

export type UpdateLiveReportParams = Omit<
  Database['public']['Tables']['general']['Update'],
  'article_id' | 'user_id'
  >;

export type GetLiveReportDetailRes = Omit<
  Database['public']['Tables']['general']['Row'],
  'article_id' | 'user_id'
  >;

export class LiveReport {
  private readonly tableName: string = 'general';

  //データ挿入関数
  public async createData(
    createData: CreateLiveReportParams
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
    updateData: Partial<UpdateLiveReportParams>
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
  ): Promise<GetLiveReportDetailRes | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .match({ article_id: articleId })
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
export const CreateLiveReport = async (
  Data: CreateLiveReportParams
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('live_report')
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
export const DeleteLiveReport = async (articleId: number, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('live_report')
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
export const UpdateLiveReport = async(
  articleId: number,
  Data: Partial<UpdateLiveReportParams>
): Promise<boolean> => {
  try {

    const { error } = await supabase
      .from('live_report')
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
export const GetLiveReport = async (
  articleId: number
): Promise<GetLiveReportDetailRes | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('live_report') // テーブル名を修正
      .select('*')
      .match({ article_id: articleId })
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
