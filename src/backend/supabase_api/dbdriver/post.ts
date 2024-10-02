import { supabase } from '../../lib/supabase';

import { checkAuth } from './checkAuth';

import type { Database } from '../../schema/supabasetypes';

export type Post = Database['public']['Tables']['post']['Row'];

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

export class PostDao {
  private readonly tableName: string = 'post';
  private readonly likesTableName: string = 'post_likes';
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
        .from(this.likesTableName)
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

//データ取得関数
export const getInitialPosts = async (): Promise<{
  posts: Post[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const LIMIT = 10;
    const { data: posts, error } = await supabase // UserIDによる絞り込みを削除
      .from('Post') // テーブル名を修正
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

export const getOlderPosts = async (
  cursor: string,
): Promise<{ posts: GetPost[]; cursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextPosts, error } = await supabase
      .from('Post')
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
      nextPosts.length > 0
        ? nextPosts[nextPosts.length - 1].created_at
        : cursor;

    return { posts: nextPosts, cursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getNewerPosts = async (
  latestcursor: string,
): Promise<{ posts: Post[]; latestcursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextPosts, error } = await supabase
      .from('Post')
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
      nextPosts.length > 0 ? nextPosts[0].created_at : latestcursor;

    return { posts: nextPosts, latestcursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

//自分のポストを取得
export const getInitialUsersPosts = async (
  userId: string,
): Promise<{
  posts: Post[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const LIMIT = 10;
    const { data: posts, error } = await supabase // UserIDによる絞り込みを削除
      .from('Post') // テーブル名を修正
      .select('*')
      .eq('UserID', userId)
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

export const getOlderUsersPosts = async (
  userId: string,
  cursor: string,
): Promise<{ posts: Post[]; cursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextPosts, error } = await supabase
      .from('Post')
      .select('*')
      .eq('UserID', userId)
      .order('created_at', { ascending: false })
      .lt('created_at', cursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { posts: [], cursor: cursor };
    }

    const nextCursor =
      nextPosts.length > 0
        ? nextPosts[nextPosts.length - 1].created_at
        : cursor;

    return { posts: nextPosts, cursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getNewerUsersPosts = async (
  userId: string,
  latestcursor: string,
): Promise<{ posts: Post[]; latestcursor: string | null }> => {
  try {
    const LIMIT = 10;
    const { data: nextPosts, error } = await supabase
      .from('Post')
      .select('*')
      .eq('UserID', userId)
      .order('created_at', { ascending: false })
      .gt('created_at', latestcursor)
      .limit(LIMIT);

    //console.log(nextPosts)

    if (error) {
      console.error('Error fetching more posts:', error);
      return { posts: [], latestcursor: latestcursor };
    }

    const nextCursor =
      nextPosts.length > 0 ? nextPosts[0].created_at : latestcursor;

    return { posts: nextPosts, latestcursor: nextCursor };
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
