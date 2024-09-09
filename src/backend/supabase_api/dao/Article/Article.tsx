import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../schema/supabasetypes';

export type Article = Database['public']['Tables']['article']['Insert'];

type CreateArticleParams = Omit<Article, 'article_id' | 'crated_at'>

type UpdateArticleParams = Omit<
  Database['public']['Tables']['article']['Update'],
  'article_id' | 'user_id'
  >;

type GetArticleRes = Database['public']['Tables']['article']['Row'];

//データ挿入関数
export const CreateArticleMetaData = async (
  Data: CreateArticleParams,
): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('article')
      .insert({ ...Data })
      .select('article_id');

    if (error) {
      throw new Error('データの挿入エラー: ' + error.message);
    }

    if (data === null || data.length !== 1) {
      throw new Error('データの挿入エラー');
    }

    return data[0].article_id;
  } catch (error) {
    console.error('データの挿入中にエラーが発生しました:', error);
    throw error;
  }
};

//データ削除関数
export const DeleteArticleMetaData = async (
  articleId: number, userId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('article')
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
export const UpdateArticleMetaData = async (
  articleId: number,
  userId: string,
  updateData: Partial<UpdateArticleParams>,
): Promise<boolean> => {
  try {

    const { data, error } = await supabase
      .from('article')
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
export const GetInitialArticleMetaData = async (): Promise<{
  posts: GetArticleRes[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const LIMIT = 10;
    const { data: posts, error } = await supabase // UserIDによる絞り込みを削除
      .from('article') 
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

export const GetOlderArticleMetaData = async (
  cursor: string,
): Promise<{ posts: GetArticleRes[]; cursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextArticles, error } = await supabase
      .from('article')
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

export const GetNewerMetaData = async (
  latestcursor: string,
): Promise<{ posts: GetArticleRes[]; latestcursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextArticles, error } = await supabase
      .from('article')
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
