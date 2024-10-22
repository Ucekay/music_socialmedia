import { supabase } from '../../lib/supabase';

export interface likeRepository {
  insertLikeToPost(postId: number, userId: string): Promise<boolean>;
  deleteLikeToPost(postId: number, userId: string): Promise<boolean>;
  existLikeToPost(postId: number, userId: string): Promise<boolean>;
  insertLikeToReply(replyId: number, userId: string): Promise<boolean>;
  deleteLikeToReply(replyId: number, userId: string): Promise<boolean>;
  existLikeToReply(replyId: number, userId: string): Promise<boolean>;
  insertLikeToArticle(articleId: number, userId: string): Promise<boolean>;
  deleteLikeToArticle(articleId: number, userId: string): Promise<boolean>;
  existLikeToArticle(articleId: number, userId: string): Promise<boolean>;
}

export class likeDao implements likeRepository {
  async insertLikeToPost(postId: number, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: userId });

      if (error) {
        throw new Error(`データの挿入エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error, postId);
      throw error;
    }
  }

  async deleteLikeToPost(postId: number, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .match({ post_id: postId, user_id: userId });

      if (error) {
        throw new Error(`データの削除エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  async existLikeToPost(postId: number, userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      return !!data;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  async insertLikeToReply(replyId: number, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reply_likes')
        .insert({ reply_id: replyId, user_id: userId });

      if (error) {
        throw new Error(`データの挿入エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error, replyId);
      throw error;
    }
  }

  async deleteLikeToReply(replyId: number, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reply_likes')
        .delete()
        .match({ reply_id: replyId, user_id: userId });

      if (error) {
        throw new Error(`データの削除エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  async existLikeToReply(replyId: number, userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('reply_likes')
        .select('id')
        .eq('reply_id', replyId)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      return !!data;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  async insertLikeToArticle(
    articleId: number,
    userId: string,
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('article_likes')
        .insert({ article_id: articleId, user_id: userId });

      if (error) {
        throw new Error(`データの挿入エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error, articleId);
      throw error;
    }
  }

  async deleteLikeToArticle(
    articleId: number,
    userId: string,
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('article_likes')
        .delete()
        .match({ article_id: articleId, user_id: userId });

      if (error) {
        throw new Error(`データの削除エラー: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  async existLikeToArticle(
    articleId: number,
    userId: string,
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('article_likes')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      return !!data;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
}
