
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
      article: {
        Row: {
          article_id: number
          created_at: string
          info_1: string | null
          info_2: string | null
          thumbnail_url: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          article_id?: number
          created_at?: string
          info_1?: string | null
          info_2?: string | null
          thumbnail_url: string
          title: string
          type: string
          user_id?: string
        }
        Update: {
          article_id?: number
          created_at?: string
          info_1?: string | null
          info_2?: string | null
          thumbnail_url?: string
          title?: string
          type?: string
          user_id?: string
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
      article_comment: {
        Row: {
          article_comment_id: number
          body: string
          created_at: string
          parent_id: number
          type: string
          user_id: string
        }
        Insert: {
          article_comment_id?: number
          body: string
          created_at?: string
          parent_id: number
          type: string
          user_id?: string
        }
        Update: {
          article_comment_id?: number
          body?: string
          created_at?: string
          parent_id?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_comment_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "article"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "ArticleComment_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      article_likes: {
        Row: {
          article_id: number
          created_at: string
          user_id: string
        }
        Insert: {
          article_id?: number
          created_at?: string
          user_id?: string
        }
        Update: {
          article_id?: number
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_likes_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "article_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          follower_id: string
        }
        Insert: {
          created_at?: string
          followed_id: string
          follower_id?: string
        }
        Update: {
          created_at?: string
          followed_id?: string
          follower_id?: string
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
      general: {
        Row: {
          article_id: number
          body: Json
          likes: number
          playlist_id: number | null
          user_id: string
          view: number
        }
        Insert: {
          article_id?: number
          body: Json
          likes?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Update: {
          article_id?: number
          body?: Json
          likes?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "general_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: true
            referencedRelation: "article"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "general_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "General_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      live_report: {
        Row: {
          body: Json
          likes: number
          live_report_id: number
          playlist_id: number | null
          user_id: string
          view: number
        }
        Insert: {
          body: Json
          likes?: number
          live_report_id?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Update: {
          body?: Json
          likes?: number
          live_report_id?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_report_live_report_id_fkey"
            columns: ["live_report_id"]
            isOneToOne: true
            referencedRelation: "article"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "live_report_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "LiveReport_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist: {
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
      playlist_article: {
        Row: {
          article_id: number
          body: Json
          likes: number
          playlist_id: number | null
          user_id: string
          view: number
        }
        Insert: {
          article_id?: number
          body: Json
          likes?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Update: {
          article_id?: number
          body?: Json
          likes?: number
          playlist_id?: number | null
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "playlist_article_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: true
            referencedRelation: "article"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "playlist_article_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "PlaylistArticle_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist_songs: {
        Row: {
          playlist_id: number
          song_id: string
        }
        Insert: {
          playlist_id?: number
          song_id: string
        }
        Update: {
          playlist_id?: number
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["playlist_id"]
          },
        ]
      }
      post: {
        Row: {
          body: string
          created_at: string
          entry_id: number
          image_url: Json
          likes: number
          user_id: string
          view: number
        }
        Insert: {
          body: string
          created_at?: string
          entry_id?: number
          image_url?: Json
          likes?: number
          user_id?: string
          view?: number
        }
        Update: {
          body?: string
          created_at?: string
          entry_id?: number
          image_url?: Json
          likes?: number
          user_id?: string
          view?: number
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
      post_likes: {
        Row: {
          post_id: number
          user_id: string
        }
        Insert: {
          post_id: number
          user_id?: string
        }
        Update: {
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
            referencedRelation: "post"
            referencedColumns: ["entry_id"]
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
      reply: {
        Row: {
          body: string
          created_at: string
          entry_id: number
          image_url: Json | null
          likes: number
          parent_id: number
          user_id: string
          view: number
        }
        Insert: {
          body: string
          created_at?: string
          entry_id?: number
          image_url?: Json | null
          likes?: number
          parent_id: number
          user_id?: string
          view?: number
        }
        Update: {
          body?: string
          created_at?: string
          entry_id?: number
          image_url?: Json | null
          likes?: number
          parent_id?: number
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "reply_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post"
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
      review: {
        Row: {
          body: Json
          likes: number
          playlist_id: number | null
          review_id: number
          user_id: string
          view: number
        }
        Insert: {
          body: Json
          likes?: number
          playlist_id?: number | null
          review_id?: number
          user_id?: string
          view?: number
        }
        Update: {
          body?: Json
          likes?: number
          playlist_id?: number | null
          review_id?: number
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "review_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "Review_UserID_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      todays_song: {
        Row: {
          body: string
          created_at: string
          likes: number
          song_id: string
          todays_song_id: number
          user_id: string
          view: number
        }
        Insert: {
          body: string
          created_at?: string
          likes?: number
          song_id: string
          todays_song_id?: number
          user_id?: string
          view?: number
        }
        Update: {
          body?: string
          created_at?: string
          likes?: number
          song_id?: string
          todays_song_id?: number
          user_id?: string
          view?: number
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
      todays_song_likes: {
        Row: {
          todays_song_id: number
          user_id: string
        }
        Insert: {
          todays_song_id: number
          user_id?: string
        }
        Update: {
          todays_song_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todays_song_likes_todays_song_id_fkey"
            columns: ["todays_song_id"]
            isOneToOne: false
            referencedRelation: "todays_song"
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
          bio: string
          created_at: string
          fav_artist: Json | null
          follow: number
          followed: number
          icon_image_url: string
          profile_id: string
          user_id: string
          user_name: string
        }
        Insert: {
          bio: string
          created_at?: string
          fav_artist?: Json | null
          follow?: number
          followed?: number
          icon_image_url: string
          profile_id: string
          user_id?: string
          user_name: string
        }
        Update: {
          bio?: string
          created_at?: string
          fav_artist?: Json | null
          follow?: number
          followed?: number
          icon_image_url?: string
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
