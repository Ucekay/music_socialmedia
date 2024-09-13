import { supabase } from '../../lib/supabase';

//認証チェック

export const checkAuth = async (): Promise<string> => {
  const user = await supabase.auth.getSession();
  if (!user.data.session) {
    throw new Error('ユーザーが認証されていません。');
  }
  return user.data.session.user.id;
};
