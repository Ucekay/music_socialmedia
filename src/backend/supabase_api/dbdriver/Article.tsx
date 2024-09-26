import { supabase } from '../../lib/supabase';
import type { Database } from '../../schema/supabasetypes';

export type Article = Database['public']['Tables']['article']['Row'];

export type CreateArticleParams = Omit<Article, 'article_id' | 'created_at'>;
export type UpdateArticleParams = Omit<Database['public']['Tables']['article']['Update'], 'article_id' | 'user_id'>;
export type GetArticleRes = Database['public']['Tables']['article']['Row'];

export class ArticleDao {
  private readonly tableName: string = 'article';
  private readonly likesTableName: string = 'article_likes';

  // データ挿入関数
  public async createData(
    createData: CreateArticleParams
  ): Promise<number> {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert({ ...createData })
        .select('article_id');

      if (error) {
        throw new Error('データの挿入エラー: ' + error.message);
      }

      if (result === null || result.length !== 1) {
        throw new Error('データの挿入エラー');
      }

      return result[0].article_id;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  // データ削除関数
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

  // データ更新関数
  public async updateData(
    articleId: number,
    userId: string,
    updateData: Partial<UpdateArticleParams>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName)
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
  }

  // データ取得関数 (最初)
  public async getInitialData(): Promise<{
    posts: GetArticleRes[];
    cursor: string | null;
    latestCursor: string | null;
  }> {
    try {
      const LIMIT = 10;
      const { data: posts, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(LIMIT);

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      const cursor = posts.length > 0 ? posts[posts.length - 1].created_at : null;
      const latestCursor = posts.length > 0 ? posts[0].created_at : null;

      return { posts, cursor, latestCursor };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  // データ取得関数 (古い記事)
  public async getOlderData(
    cursor: string
  ): Promise<{ posts: GetArticleRes[]; cursor: string | null }> {
    try {
      const LIMIT = 10;
      const { data: nextArticles, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .lt('created_at', cursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [], cursor: cursor };
      }

      const nextCursor = nextArticles.length > 0
        ? nextArticles[nextArticles.length - 1].created_at
        : cursor;

      return { posts: nextArticles, cursor: nextCursor };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  // データ取得関数 (新しい記事)
  public async getNewerData(
    latestCursor: string
  ): Promise<{ posts: GetArticleRes[]; latestCursor: string | null }> {
    try {
      const LIMIT = 10;
      const { data: nextArticles, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .gt('created_at', latestCursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [], latestCursor: latestCursor };
      }

      const nextCursor = nextArticles.length > 0
        ? nextArticles[0].created_at
        : latestCursor;

      return { posts: nextArticles, latestCursor: nextCursor };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  // データ取得関数 (いいね状態)
  public async getLikeStatus(
    articleId: number,
    userId: string
  ): Promise<boolean> {
    try {
      const { count, error } = await supabase
        .from(this.likesTableName)
        .select('id', { count: 'exact' })
        .match({ article_id: articleId, user_id: userId });

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      if (count === 0) {
        return false;
      } else if (count === 1) {
        return true;
      } else {
        throw new Error('データの取得エラー');
      }
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
}
