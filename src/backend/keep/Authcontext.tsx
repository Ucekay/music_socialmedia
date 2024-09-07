// import { Database } from "../../../types/supabasetypes";
// import { useContext } from "react";
// import { AuthContext } from "../../../components/AuthProvider"; // AuthContextのインポートパスは適宜修正

// // ... 型定義 ...

// // AuthContextからSupabaseクライアントとユーザー情報を取得するヘルパー関数
// const useSupabase = () => {
//   const { supabase, user } = useContext(AuthContext);
//   if (!supabase || !user) {
//     throw new Error("Supabase client or user is not available.");
//   }
//   return { supabase, user };
// };

// //データ挿入関数
// export const insertGeneral = async (
//   Data: Omit<General, 'ArticleID' | 'UserID' | 'likes' | 'view' | 'created_at'>
// ): Promise<boolean> => {
//   try {
//     const { supabase } = useSupabase(); // Supabaseクライアントを取得
//     const { error } = await supabase
//       .from('General')
//       .insert({ ...Data, UserID: user.id }); // useContextで取得したuser.idを使用

//     // ... エラー処理 ...

//   } catch (error) {
//     // ... エラー処理 ...
//   }
// };

// //データ削除関数
// export const deleteGeneral = async (articleId: number): Promise<boolean> => {
//   try {
//     const { supabase, user } = useSupabase(); // Supabaseクライアントとユーザー情報を取得
//     const { error } = await supabase
//       .from('General')
//       .delete()
//       .match({ ArticleID: articleId, UserID: user.id }); // useContextで取得したuser.idを使用

//     // ... エラー処理 ...

//   } catch (error) {
//     // ... エラー処理 ...
//   }
// };

// //データ更新関数
// export const updateGeneral = async (
//   articleId: number,
//   updateData: Partial<UpdateGeneral>
// ): Promise<boolean> => {
//   try {
//     const { supabase, user } = useSupabase(); // Supabaseクライアントとユーザー情報を取得
//     const { data, error } = await supabase
//       .from('General')
//       .update(updateData)
//       .match({ ArticleID: articleId, UserID: user.id }); // useContextで取得したuser.idを使用

//     // ... エラー処理 ...

//   } catch (error) {
//     // ... エラー処理 ...
//   }
// };

// //データ取得関数
// export const getGeneral = async (articleId: number): Promise<GetGeneral | null> => {
//   try {
//     const { supabase } = useSupabase(); // Supabaseクライアントを取得
//     const { data, error } = await supabase
//       .from('General')
//       .select('*')
//       .match({ ArticleID: articleId })
//       .single();

//     // ... エラー処理 ...

//   } catch (error) {
//     // ... エラー処理 ...
//   }
// };

// // ... url作成関数 ...
// content_copy
// Use code with caution.
// JavaScript

// 変更点:

// useContext を使用して AuthContext から supabase と user を取得する useSupabase ヘルパー関数を定義しました。

// 各関数内で checkAuth を呼び出す代わりに、 useSupabase を呼び出して supabase クライアントと user 情報を取得するように変更しました。

// 取得した user.id を Supabase のクエリで使用するように変更しました。

// 注意点:

// AuthContext のインポートパスは、実際のファイル構造に合わせて修正してください。

// useSupabase はコンポーネント内ではなく、コンポーネント外で定義してください。

// AuthProvider が上位コンポーネントで正しく設定されていることを確認してください。

// これで、useContext を使用してセッション情報を共有し、各関数で利用できるようになりました。
