import { Database } from "../../types/supabasetypes";
import { supabase } from "../../lib/supabase";
import { checkAuth } from "./checkAuth";

export type Likes = Database['public']['Tables']['Postlikes']['Row']

//データ挿入関数
export const insertlike = async (
    postId: number):Promise<boolean> => {
      try{
        const userId = await checkAuth();
        const {error} = await supabase
        .from('Postlikes')
        .insert({PostID: postId, UserID:userId});
  
      if(error){
        throw new Error('データの挿入エラー: ' + error.message);
      }
    
      return true; 
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error,postId);
      throw error;
      }
    }

//データ削除関数
export const deleteLike = async(
    postId: number):Promise<boolean> =>{
        try {
            const userId = await checkAuth();
            const {error} = await supabase
            .from('Postlikes')
            .delete()
            .match({PostID: postId, UserID: userId});
        
            if(error) {
              throw new Error('データの削除エラー: ' + error.message);
            }
        
            return true;
          }catch (error) {
            console.error('データの削除中にエラーが発生しました:', error);
            throw error;
          }
        };