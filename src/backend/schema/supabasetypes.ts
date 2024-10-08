
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      artists: {
        Row: {
          artist_name: string
          id: number
          musickit_id: string | null
        }
        Insert: {
          artist_name: string
          id?: number
          musickit_id?: string | null
        }
        Update: {
          artist_name?: string
          id?: number
          musickit_id?: string | null
        }
        Relationships: []
      }
      blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
        }
        Insert: {
          blocked_id: string
          blocker_id?: string
          created_at?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blocks_BlockedID_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blocks_BlockerID_fkey"
            columns: ["blocker_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          followed_id: string
          followed_notified: boolean
          follower_id: string
          follower_notified: boolean
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          followed_id: string
          followed_notified?: boolean
          follower_id?: string
          follower_notified?: boolean
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          followed_id?: string
          followed_notified?: boolean
          follower_id?: string
          follower_notified?: boolean
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Follows_FollowedID_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Follows_FollowerID_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      generals: {
        Row: {
          content: Json
          general_id: number
          image_urls: Json | null
          playlist_id: number | null
          user_id: string
        }
        Insert: {
          content: Json
          general_id?: number
          image_urls?: Json | null
          playlist_id?: number | null
          user_id?: string
        }
        Update: {
          content?: Json
          general_id?: number
          image_urls?: Json | null
          playlist_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "general_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "music_playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "generals_general_id_fkey"
            columns: ["general_id"]
            isOneToOne: true
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
          {
            foreignKeyName: "generals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      livereports: {
        Row: {
          content: Json
          image_urls: Json | null
          livereport_id: number
          playlist_id: number | null
          user_id: string
        }
        Insert: {
          content: Json
          image_urls?: Json | null
          livereport_id?: number
          playlist_id?: number | null
          user_id?: string
        }
        Update: {
          content?: Json
          image_urls?: Json | null
          livereport_id?: number
          playlist_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_report_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "music_playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "LiveReport_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livereports_livereport_id_fkey"
            columns: ["livereport_id"]
            isOneToOne: true
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
        ]
      }
      mlog_comments: {
        Row: {
          content: string
          created_at: string
          target_id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          target_id: number
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ArticleComment_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlog_comments_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
        ]
      }
      mlog_likes: {
        Row: {
          created_at: string
          target_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          target_id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlog_likes_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
        ]
      }
      mlogs: {
        Row: {
          created_at: string
          deleted_at: string | null
          info_1: string | null
          info_2: string | null
          likes: number
          mlog_id: number
          thumbnail_url: string
          title: string
          type: string
          user_id: string
          views: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          info_1?: string | null
          info_2?: string | null
          likes?: number
          mlog_id?: number
          thumbnail_url: string
          title: string
          type: string
          user_id?: string
          views?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          info_1?: string | null
          info_2?: string | null
          likes?: number
          mlog_id?: number
          thumbnail_url?: string
          title?: string
          type?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "Article_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      music_playlist: {
        Row: {
          created_at: string
          playlist_id: number
          playlist_title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          playlist_id?: number
          playlist_title?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          playlist_id?: number
          playlist_title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Playlist_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          notification_id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          notification_id?: number
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          notification_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist_musics: {
        Row: {
          music_id: string
          playlist_id: number
        }
        Insert: {
          music_id: string
          playlist_id?: number
        }
        Update: {
          music_id?: string
          playlist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "music_playlist"
            referencedColumns: ["playlist_id"]
          },
        ]
      }
      playlists: {
        Row: {
          content: Json
          image_urls: Json | null
          mlog_playlist_id: number
          user_id: string
        }
        Insert: {
          content: Json
          image_urls?: Json | null
          mlog_playlist_id: number
          user_id?: string
        }
        Update: {
          content?: Json
          image_urls?: Json | null
          mlog_playlist_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_article_playlist_id_fkey"
            columns: ["mlog_playlist_id"]
            isOneToOne: true
            referencedRelation: "music_playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "PlaylistArticle_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlists_mlog_playlist_id_fkey"
            columns: ["mlog_playlist_id"]
            isOneToOne: true
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Likes_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["entry_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          entry_id: number
          image_urls: Json
          likes: number
          user_id: string
          views: number
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          entry_id?: number
          image_urls?: Json
          likes?: number
          user_id?: string
          views?: number
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          entry_id?: number
          image_urls?: Json
          likes?: number
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "PostAndComment_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
      replies: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          entry_id: number
          image_urls: Json | null
          likes: number
          parent_post_id: number
          parent_reply_id: number | null
          user_id: string
          views: number
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          entry_id?: number
          image_urls?: Json | null
          likes?: number
          parent_post_id: number
          parent_reply_id?: number | null
          user_id?: string
          views?: number
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          entry_id?: number
          image_urls?: Json | null
          likes?: number
          parent_post_id?: number
          parent_reply_id?: number | null
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "reply_parent_id_fkey"
            columns: ["parent_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["entry_id"]
          },
          {
            foreignKeyName: "Reply_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reply_likes: {
        Row: {
          created_at: string
          target_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          target_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_likes_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["entry_id"]
          },
          {
            foreignKeyName: "reply_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: Json
          image_urls: Json | null
          playlist_id: number | null
          review_id: number
          user_id: string
        }
        Insert: {
          body: Json
          image_urls?: Json | null
          playlist_id?: number | null
          review_id?: number
          user_id?: string
        }
        Update: {
          body?: Json
          image_urls?: Json | null
          playlist_id?: number | null
          review_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "music_playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "Review_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "mlogs"
            referencedColumns: ["mlog_id"]
          },
        ]
      }
      todays: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          likes: number
          music_id: string
          todays_song_id: number
          user_id: string
          views: number
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          likes?: number
          music_id: string
          todays_song_id?: number
          user_id?: string
          views?: number
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          likes?: number
          music_id?: string
          todays_song_id?: number
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "Today'sSong_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      todays_likes: {
        Row: {
          created_at: string | null
          target_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          target_id: number
          user_id?: string
        }
        Update: {
          created_at?: string | null
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todays_song_likes_todays_song_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "todays"
            referencedColumns: ["todays_song_id"]
          },
          {
            foreignKeyName: "TodaysSongLikes_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          deleted_at: string | null
          follow: number
          followed: number
          icon_image_url: string | null
          is_private: boolean
          profile_id: string
          user_id: string
          user_name: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          deleted_at?: string | null
          follow?: number
          followed?: number
          icon_image_url?: string | null
          is_private?: boolean
          profile_id: string
          user_id?: string
          user_name: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          deleted_at?: string | null
          follow?: number
          followed?: number
          icon_image_url?: string | null
          is_private?: boolean
          profile_id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Users_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_artists: {
        Row: {
          artist_id: number
          user_id: string
        }
        Insert: {
          artist_id: number
          user_id?: string
        }
        Update: {
          artist_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_artists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
