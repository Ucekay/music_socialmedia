import { supabase } from '../../../lib/supabase';
import { checkAuth } from '../checkAuth';

import type { Database } from '../../../types/supabasetypes';

export type Article = Database['public']['Tables']['Article']['Insert'];
type UpdateArticle = Omit<
  Database['public']['Tables']['Article']['Update'],
  'ArticleID' | 'UserID'
>;
type GetArticle = Database['public']['Tables']['Article']['Row'];

//データ挿入関数
export const insertArticleMetaData = async (
  Data: Omit<Article, 'ArticleID' | 'UserID' | 'crated_at'>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('Article')
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
export const deleteArticleMetaData = async (
  articleId: number,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();
    const { error } = await supabase
      .from('Article')
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
export const updateArticleMetaData = async (
  articleId: number,
  updateData: Partial<UpdateArticle>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();

    const { data, error } = await supabase
      .from('Article')
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
export const getInitialArticleMetaData = async (): Promise<{
  posts: GetArticle[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const LIMIT = 10;
    const { data: posts, error } = await supabase // UserIDによる絞り込みを削除
      .from('Article') // テーブル名を修正
      .select('*')
      .order('created_at', { ascending: false })
      .limit(LIMIT);

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    const cursor = posts.length > 0 ? posts[posts.length - 1].created_at : null;
    const latestcursor = posts.length > 0 ? posts[0].created_at : null;

    return { posts, cursor, latestcursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getOlderArticleMetaData = async (
  cursor: string,
): Promise<{ posts: GetArticle[]; cursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextArticles, error } = await supabase
      .from('Article')
      .select('*')
      .order('created_at', { ascending: false })
      .lt('created_at', cursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { posts: [], cursor: cursor };
    }

    const nextCursor =
      nextArticles.length > 0
        ? nextArticles[nextArticles.length - 1].created_at
        : cursor;

    return { posts: nextArticles, cursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getNewerMetaData = async (
  latestcursor: string,
): Promise<{ posts: GetArticle[]; latestcursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextArticles, error } = await supabase
      .from('Article')
      .select('*')
      .order('created_at', { ascending: false })
      .gt('created_at', latestcursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { posts: [], latestcursor: latestcursor };
    }

    const nextCursor =
      nextArticles.length > 0 ? nextArticles[0].created_at : latestcursor;

    return { posts: nextArticles, latestcursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
