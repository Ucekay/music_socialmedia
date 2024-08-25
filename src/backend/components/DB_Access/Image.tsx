import { supabase } from '../../lib/supabase'
import * as FileSystem from 'react-native-fs';
import { checkAuth } from './checkAuth';
import * as ImageManipulator from 'expo-image-manipulator'
import { decode } from 'base64-arraybuffer'

export const uploadImage = async (imageUri: string, storageName: string) => {
  try {
    // 1. 画像データを base64 エンコードされた文字列として読み込む 

    const actions:any[] = [];
    const saveOptions ={
      base64: true,};
    const base64Data = await ImageManipulator.manipulateAsync(
      imageUri, actions, saveOptions
    )
    //console.log(base64Data.base64)

    // 2. ファイル名を生成
    const fileName = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 15)}.jpg`; // ファイル名

    // 3. ユーザーIDを取得 (適切なエラー処理を追加)
    const userId = checkAuth();

    // 4. ファイルをストレージにアップロード
    if(base64Data.base64){
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(storageName)
      .upload(fileName, decode(base64Data.base64), { // base64Data をアップロード
        cacheControl: 'no-cache',
        upsert: true,
        contentType: 'image/jpeg;base64', // ファイルタイプを明示的に指定
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




// 画像ファイルをストレージにアップロードして、URLを取得する関数
export const uploadImageToStorage = async (file: File, storagename: string) => {
  try {
    // 1. File オブジェクトから base64 データを取得
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // 2. ファイル名を生成（拡張子を保持）
    const fileName = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 15)}.${file.name.split('.').pop()}`;

    // 3. base64 データの先頭部分を削除
    const uploadData = base64Data.replace(/^data:[^;]+;base64,/, '');

    // ユーザーIDを取得 (適切なエラー処理を追加)
    const userId = checkAuth(); 

    // ファイルをストレージにアップロード
    const { error: uploadError } = await supabase.storage
      .from(storagename)
      .upload(fileName, file, {
        cacheControl: '3600', 
        upsert: true, 
      });

    if (uploadError) {
      console.error('画像アップロードエラー:', uploadError, fileName, storagename);
      throw uploadError; // エラーを再スロー
    }

    // アップロードされた画像のURLを取得
    try {
      // アップロードされた画像のURLを取得
      const { data } = await supabase.storage
        .from('images')
        .getPublicUrl(fileName);
    
      if (!data) { 
        console.error('画像データ取得エラー: データが取得できませんでした');
        throw new Error('画像データが取得できませんでした'); 
      }
    
      // 公開 URL を返す
      return data.publicUrl;
    
    } catch (error) {
      console.error('画像URL取得エラー:', error);
      throw error;
    }
  
  } catch (error) {
    console.error('画像アップロード中にエラーが発生しました:', error);
    throw error; // エラーを再スロー
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
  
  // 使用例
 /* const myImageFile = new File(['your image data'], 'my-image.jpg', { type: 'image/jpeg' });
  
  uploadImageToStorage(myImageFile)
    .then(imageUrl => {
      // imageUrlを使って画像を表示したり、他の処理を行うことができます
      console.log('画像のURL:', imageUrl);
    })
    .catch(error => {
      console.error('画像アップロードエラー:', error);
    });
*/