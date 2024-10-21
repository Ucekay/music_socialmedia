import { supabase } from '../../lib/supabase'
import { checkAuth } from './checkAuth';
import * as ImageManipulator from 'expo-image-manipulator'
import { decode } from 'base64-arraybuffer'

export const uploadImage = async (imageUri: string, storageName: string) => {
  try {
    // 1. 画像データを base64 エンコードされた文字列として読み込む 
    const actions:any[] = [];
    const saveOptions ={
      base64: true,};
    const mainResult = await ImageManipulator.manipulateAsync(
      imageUri, actions, saveOptions
    )
    //console.log(base64Data.base64)

    // 2. ファイル名を生成
    const fileName = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 15)}.jpg`; // ファイル名

    // 3. ユーザーIDを取得 (適切なエラー処理を追加)
    const userId = checkAuth();

    // 4. ファイルをストレージにアップロード
    if(mainResult.base64){
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(storageName)
      .upload(fileName, decode(mainResult.base64), { // base64Data をアップロード
        cacheControl: 'no-cache',
        upsert: true,
        contentType: 'image/jpeg', // ファイルタイプを明示的に指定
      });
      
    if(uploadData){
      //console.log('アップロードされた画像データ:', uploadData);
    }

    if (uploadError) {
      console.error('画像アップロードエラー:', uploadError, fileName, storageName);
      throw uploadError;
     }
    }

    // 5. アップロードされた画像のURLを取得
    try {
      const { data } = await supabase.storage
        .from(storageName) // storageName を使用する
        .getPublicUrl(fileName);

      if (!data) {
        console.error('画像データ取得エラー: データが取得できませんでした');
        throw new Error('画像データが取得できませんでした');
      }

      return data.publicUrl;

    } catch (error) {
      console.error('画像URL取得エラー:', error);
      throw error;
    }

  } catch (error) {
    console.error('画像アップロード中にエラーが発生しました:', error);
    throw error; 
  }
};

  export const GetImageData = async (imageUri: string):Promise<File|undefined> => {
    try {
      // fetchを使って画像データを取得
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // ファイル名を取得
    const fileName = imageUri.split('/').pop() || 'image.jpg';

    // File オブジェクトを作成
    const file = new File([blob], fileName, { type: blob.type });
    return file;


  } catch (error) {
    console.error('画像の処理中にエラーが発生しました:', error);
    return undefined;
  }
};
  
export const deleteImageFromUrl = async (publicUrl: string, storageName: string) =>{
  const imageUri = publicUrl.split("/").pop();
  if (imageUri) {
    const { data, error } = await supabase
      .storage
      .from(storageName)
      .remove([imageUri]);

    if (error) {
      console.error("画像の削除中にエラーが発生しました", error);
    } else {
      console.log('画像が正常に削除されました', data);
    }
  } else {
    console.error("画像の削除エラー: 無効な publicUrl です");
  }
}

export const deleteImageFromPath = async (path: string, storageName: string) =>{
  const {data, error} = await supabase
  .storage
  .from(storageName)
  .remove([path]);
  
  if (error) {
  console.error("画像の削除中にエラーが発生しました", error);
  } else {
  console.log('画像が正常に削除されました', data);
  }
  }
  