import type { Database } from '../../schema/supabasetypes';

export type Post = Database['public']['Tables']['posts']['Row'];

export type CreatePostParams = Omit<Post, 'entry_id' | 'likes' | 'view' | 'created_at'>;

export interface PostRepository {
  createPost(createData: CreatePostParams): Promise<number>;
  deletePost(postId: number, userId: string): Promise<boolean>;
  getPost(postId: number): Promise<Post>;
  getInitialPosts(): Promise<{ posts: Post[] }>;
  getOlderPosts(cursor: string): Promise<{ posts: Post[] | null }>;
  getNewerPosts(latestcursor: string): Promise<{ posts: Post[] | null }>;
  
  getPostLikes(entryId: number, userId: string): Promise<boolean>;
}

export class PostDao implements PostRepository {
  private readonly tableName: string = 'post';
  private readonly tableNameLikes: string = 'post_likes';
  private readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  // データ挿入関数
  public async createPost(
    createData: CreatePostParams
  ): Promise<number> {
    try {
      const { data: result, error } = await this.db
        .from(this.tableName)
        .insert({ ...createData })
        .select('entry_id');

      if (error) {
        throw new Error('データの挿入エラー: ' + error.message);
      }

      if (result === null || result.length !== 1) {
        throw new Error('データの挿入エラー');
      }

      return result[0].entry_id;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  // データ削除関数
  public async deletePost(
    postId: number,
    userId: string
  ): Promise<boolean> {
    try {
      const { error } = await this.db
        .from(this.tableName)
        .delete()
        .match({ entry_id: postId, user_id: userId });

      if (error) {
        throw new Error('データの削除エラー: ' + error.message);
      }

      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  //データ取得関数
  public async getPost(
    postId: number
  ): Promise<Post> {
    try {
      const { data, error } = await this.db
        .from(this.tableName)
        .select('*')
        .eq('entry_id', postId);

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      if (data === null || data.length !== 1) {
        throw new Error('データの取得エラー');
      }

      return data[0];
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getInitialPosts(): Promise<{
    posts: Post[];
  }> {
    try {
      const LIMIT = 10;
      const { data: posts, error } = await this.db
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(LIMIT);

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      return { posts };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getOlderPosts(
    cursor: string
  ): Promise<{ posts: Post[] | null }> {
    try {
      const LIMIT = 10;
      const { data: posts, error } = await this.db
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .lt('created_at', cursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [] };
      }

      return { posts: posts };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getNewerPosts(
    latestcursor: string
  ): Promise<{ posts: Post[] | null }> {
    try {
      const LIMIT = 10;
      const { data: nextPosts, error } = await this.db
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .gt('created_at', latestcursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [] };
      }

      return { posts: nextPosts };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  //データ取得関数（いいね状態）
  public async getPostLikes(
    entryId: number,
    userId: string
  ): Promise<boolean> {
    try {
      const { count, error } = await this.db
        .from(this.tableNameLikes)
        .select('*', { count: 'exact' })
        .match({ entry_id: entryId, user_id: userId });

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
