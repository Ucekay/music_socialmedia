import { Database } from "../../../types/supabasetypes";
import { supabase } from "../../../lib/supabase";
import { checkAuth } from "../checkAuth";

type Review = Database['public']['Tables']['Review']['Insert'];
type UpdateReview = 
Omit<Database['public']['Tables']['Review']['Update'], 'ArticleID'| 'UserID'>
type Getreview = 
Omit<Database['public']['Tables']['Review']['Row'], 'ArticleID'| 'UserID'>

//データ挿入関数
export const insertReview = async (
    Data: Omit<Review, 'ArticleID' | 'UserID' | 'likes' |
    'view' | 'created_at'>): Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('Review')
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