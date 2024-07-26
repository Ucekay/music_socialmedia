import { Database } from "../../types/supabasetypes";
import { supabase } from "../../lib/supabase";
import { checkAuth } from "./checkAuth";

export type Post = Database['public']['Tables']['Post']['Insert'];
export type GetPost = 
Omit<Database['public']['Tables']['Post']['Row'], 'ArticleID'| 'UserID'>

//データ挿入関数
export const insertPost = async (
    Data: Omit<Post, 'EntryID' | 'UserID' | 'likes' |
    'view' | 'created_at'>): Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('Post')
        .insert({...Data, UserID:userId});
  
      if(error){
        throw new Error('データの挿入エラー: ' + error.message);
      }
    
      return true; 
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error,Data);
      throw error;
      }
    }

//データ取得関数
export const getInitialPosts = async (): Promise<{posts: GetPost[], cursor:string | null}> => {
  try {

    const LIMIT = 10
    const { data: posts, error } = await supabase // UserIDによる絞り込みを削除
      .from('Post') // テーブル名を修正
      .select('*')
      .order('created_at', {ascending: false})
      .limit(LIMIT);

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }
    const cursor = posts.length > 0 ? posts[posts.length - 1].created_at : null;

    return { posts, cursor}; 
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const getMorePosts =  async (cursor: string): Promise<{ posts: Post[]; cursor: string | null }> => {
  try{
  
  const LIMIT = 10
  const { data: nextPosts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .lt('created_at', cursor)
    .limit(LIMIT);

  if (error) {
    console.error('Error fetching more posts:', error);
    return { posts: [], cursor: null };
  }

  const nextCursor = nextPosts.length > 0 ? nextPosts[nextPosts.length - 1].created_at : null;

  return { posts: nextPosts, cursor: nextCursor };
}catch (error) {
  console.error('データの取得中にエラーが発生しました:', error);
  throw error;
}
};