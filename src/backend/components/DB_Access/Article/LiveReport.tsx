import { Database } from "../../../types/supabasetypes";
import { supabase } from "../../../lib/supabase";
import { checkAuth } from "../checkAuth";

type LiveReport = Database['public']['Tables']['LiveReport']['Insert'];
type UpdateLiveReport = 
Omit<Database['public']['Tables']['LiveReport']['Update'], 'ArticleID'| 'UserID'>
type GetLiveReport = 
Omit<Database['public']['Tables']['LiveReport']['Row'], 'ArticleID'| 'UserID'>

//データ挿入関数
export const insertLiveReport = async (
    Data: Omit<LiveReport, 'ArticleID' | 'UserID'  | 'likes' |
    'view' | 'created_at'>): Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('Livereport')
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

//データ削除関数
export const deleteLiveReport = async (articleId: number): Promise<boolean> =>{
    try {
      const userId = await checkAuth();
      const {error} = await supabase
      .from('LiveReport')
      .delete()
      .match({ArticleID: articleId, UserID: userId});
  
      if(error) {
        throw new Error('データの削除エラー: ' + error.message);
      }
  
      return true;
    }catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  };

