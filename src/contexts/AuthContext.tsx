import { ReactNode, useContext, createContext, useEffect, useState } from "react"
import { supabase } from '../backend/lib/supabase';
import { Session } from "@supabase/supabase-js";

type AuthCtx = {
    session: Session | null,
    loading: boolean
    setLoading: any
    login: ({ email, password }: { email: string; password: string }) => Promise<void>
    signup: ({ email, password }: { email: string; password: string }) => Promise<void>
    logout: () => Promise<void>
  }
  const AuthContext = createContext<AuthCtx>({
    session: null,
    loading: true,
    setLoading: () => {}, // 一時的な関数定義
    login: async () => {}, 
    signup: async () => {},
    logout: async () => {} 
  });

  const useAuth = () => useContext(AuthContext)
  
  const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = supabase.auth
  
    const [loading, setLoading] = useState<boolean>(true)
    const [session, setSession] = useState<Session|null>(null)
  
  //session処理の実行中は画面を表示しないようにする
    useEffect(() => {
      let mounted = true
      ;(async () => {
        const { data: { session }} = await auth.getSession()
        if (mounted) {
          if (session) {
            setSession(session)
          }
          setLoading(false)
        }
      })()
      const {data: { subscription },
      } = auth.onAuthStateChange((_event, session) => {
        setSession(session)
        if (_event === "SIGNED_OUT") {
          setSession(null)
        }
      })
      return () => {
        mounted = false
        subscription?.unsubscribe()
      }
    }, [])
    const login = async ({ email, password }: { email: string; password: string }) => {
      await auth.signInWithPassword({ email: email, password: password })
    }
  
    const signup = async ({ email, password }: { email: string; password: string }) => {
      await auth.signUp({ email: email, password: password })
    }
  
    const logout = async  () => {
      await auth.signOut()
    }
  
    const exposed = {
      session,
      loading,
      setLoading,
      signup,
      login,
      logout,
    }
    return <AuthContext.Provider value={exposed}>{!loading && children}</AuthContext.Provider>
  }
  
  export { useAuth, AuthProvider }