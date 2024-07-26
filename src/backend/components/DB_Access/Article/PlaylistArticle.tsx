import { Database } from "../../../types/supabasetypes";
import { supabase } from "../../../lib/supabase";
import { checkAuth } from "../checkAuth";

type PlaylistArticle = Database['public']['Tables']['PlaylistArticle']['Insert'];
type UpdateReview = 
Omit<Database['public']['Tables']['PlaylistArticle']['Update'], 'ArticleID'| 'UserID'>
type GetPlaylistArticle = 
Omit<Database['public']['Tables']['PlaylistArticle']['Row'], 'ArticleID'| 'UserID'>

//データ挿入関数
export const insertPlaylistArticle = async (
    Data: Omit<PlaylistArticle, 'ArticleID' | 'UserID' | 'likes' |
    'view' | 'created_at'>): Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('PlaylistArticle')
        .insert({...Data, UserID:userId});
  
      if(error){
        throw new Error('データの挿入エラー: ' + error.message);
      }
    
      return true; 
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
      }
    }