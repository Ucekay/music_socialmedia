import { Database } from "../../types/supabasetypes";
import { supabase } from "../../lib/supabase";
import { checkAuth } from "./checkAuth";

type TodaysSong = Database['public']['Tables']['TodaysSong']['Insert'];
type GetTodaysSong = 
Omit<Database['public']['Tables']['TodaysSong']['Row'], 'ArticleID'| 'UserID'>

//データ挿入関数
export const insertTodaysSong = async (
    Data: Omit<TodaysSong, 'TodaysSongID' | 'UserID' | 'likes' |
    'view' | 'created_at'>): Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('TodaysSong')
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