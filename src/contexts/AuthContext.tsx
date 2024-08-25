import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../backend/lib/supabase';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const USER_ID_KEY = Constants.expoConfig?.extra?.USER_ID_KEY;
const SECURE_STORE_KEY = Constants.exxpoConfig?.extra?.SECURE_STORE_KEY;

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: 'apple' | 'google') => Promise<void>;
  signOut: () => Promise<void>;
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithOAuth: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const storedSession = await SecureStore.getItemAsync(SECURE_STORE_KEY);
      if (storedSession) {
        try {
          const { data, error } = await supabase.auth.refreshSession(
            JSON.parse(storedSession).refresh_token
          );
          if (error) {
            console.error('セッションの復元に失敗しました:', error);
          } else {
            // data.session が null かどうかをチェック
            if (data.session) {
              setSession(data.session);
            } else {
              // セッションが null の場合の処理（例：エラー状態をセットするなど）
              console.error('セッション情報が取得できませんでした');
              // 必要に応じて setSession(null) を行う
            }
          }
        } catch (error) {
          console.error('SecureStoreからの読み込みエラー:', error);
        }
      }
      setLoading(false);
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        if (session) {
          try {
            // セッションが有効になったら、ユーザーIDをAsyncStorageに保存
            await AsyncStorage.setItem(USER_ID_KEY, session.user.id);
            await SecureStore.setItemAsync(
              SECURE_STORE_KEY,
              JSON.stringify({ refresh_token: session.refresh_token })
            );
          } catch (error) {
            console.error('SecureStoreへの保存エラー:', error);
          }
        } else {
          await AsyncStorage.removeItem(USER_ID_KEY);
          await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // メールアドレスとパスワードによるログイン
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      // エラー処理を実装する
    }
  };

  // メールアドレスとパスワードによるサインアップ
  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      // エラー処理を実装する
    }
  };

  // OAuthによるログイン
  const signInWithOAuth = async (provider: 'apple' | 'google') => {
    try {
      // SupabaseでOAuth認証を行う
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        console.error(error);
        // エラー処理を実装する
      }
    } catch (error) {
      console.error(error);
      // エラー処理を実装する
    }
  };

  // ログアウト
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      // エラー処理を実装する
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithOAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Contextを使用するためのカスタムフック
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth };
