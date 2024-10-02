import { supabase } from '../../lib/supabase';

import type { Database } from '../../schema/supabasetypes';

export type PlaylistArticleDB = Database['public']['Tables']['playlist_article']['Insert'];

export type CreatePlaylistArticleParams = Omit<PlaylistArticleDB, 'likes' | 'view'>;

export type UpdatePlaylistArticleParams = Omit<
  Database['public']['Tables']['playlist_article']['Update'],
  'article_id' | 'user_id'
>;

export type GetPlaylistArticleDetailRes = Omit<
  Database['public']['Tables']['playlist_article']['Row'],
  'article_id' | 'user_id'
>;

export class PlaylistArticle {
  private readonly tableName: string = 'playlist_article';

  //データ挿入関数
  public async createData(
    createData: CreatePlaylistArticleParams
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
    updateData: Partial<UpdatePlaylistArticleParams>
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
  ): Promise<GetPlaylistArticleDetailRes | null> {
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
export const CreatePlaylistArticle = async (
  Data: CreatePlaylistArticleParams,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('playlsit_article')
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
export const DeletePlaylistArticle = async(articleId: number, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('playlist_article')
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
export const UpdatePlaylistArticle = async(
  articleId: number,
  Data: UpdatePlaylistArticleParams,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('playlist_article')
      .update({ ...Data })
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
export const GetPlaylistArticle = async (
  articleId: number,
): Promise<GetPlaylistArticleDetailRes | null> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('playlist_article') // テーブル名を修正
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
};
