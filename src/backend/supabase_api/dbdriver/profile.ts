import { supabase } from '../../lib/supabase';

import { checkAuth } from './checkAuth';

import type { Database } from '../../schema/supabasetypes';

export type UserProfile = Database['public']['Tables']['users']['Row'];
export type UpdateUserProfile = Omit<
  Database['public']['Tables']['users']['Update'],
  'UserID'
>;
export type UserProfileforPosts = {
  IconImageUrl: string;
  ProfileID: string;
  UserName: string;
};

export const getUserId = async (): Promise<string> => {
  const userId = checkAuth();
  return userId;
};

//データ取得関数
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('users') // テーブル名を修正
      .select('*')
      .match({ UserID: userId })
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};

//データ更新関数
export const updateUserPofile = async (
  UserID: string,
  updateData: Partial<UpdateUserProfile>,
): Promise<boolean> => {
  try {
    const userId = await checkAuth();

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .match({ UserID: userId });

    if (error) {
      throw new Error('データの更新エラー: ' + error.message);
    }

    return true;
  } catch (error) {
    console.error('データの更新中にエラーが発生しました:', error);
    throw error;
  }
};

//投稿用のプロフィール取得関数
export const getUserProfileforPosts = async (
  userId: string,
): Promise<UserProfileforPosts> => {
  try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('users') // テーブル名を修正
      .select('IconImageUrl, UserName, ProfileID')
      .eq('UserID', userId)
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};
