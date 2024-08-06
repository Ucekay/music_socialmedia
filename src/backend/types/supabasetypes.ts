
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
      ArticleComment: {
        Row: {
          ArticleCommentID: number
          Body: string
          created_at: string
          ParentID: number
          type: string
          UserID: string
        }
        Insert: {
          ArticleCommentID?: number
          Body: string
          created_at?: string
          ParentID: number
          type: string
          UserID?: string
        }
        Update: {
          ArticleCommentID?: number
          Body?: string
          created_at?: string
          ParentID?: number
          type?: string
          UserID?: string
        }
        Relationships: [
          {
            foreignKeyName: "ArticleComment_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ArticleLikes: {
        Row: {
          ArticleID: number
          created_at: string
          Type: string
          UserID: string
        }
        Insert: {
          ArticleID?: number
          created_at?: string
          Type: string
          UserID?: string
        }
        Update: {
          ArticleID?: number
          created_at?: string
          Type?: string
          UserID?: string
        }
        Relationships: []
      }
      Blocks: {
        Row: {
          BlockedID: string
          BlockerID: string
          created_at: string
        }
        Insert: {
          BlockedID: string
          BlockerID?: string
          created_at?: string
        }
        Update: {
          BlockedID?: string
          BlockerID?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blocks_BlockedID_fkey"
            columns: ["BlockedID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blocks_BlockerID_fkey"
            columns: ["BlockerID"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Follows: {
        Row: {
          created_at: string
          FollowedID: string
          FollowerID: string
        }
        Insert: {
          created_at?: string
          FollowedID: string
          FollowerID?: string
        }
        Update: {
          created_at?: string
          FollowedID?: string
          FollowerID?: string
        }
        Relationships: [
          {
            foreignKeyName: "Follows_FollowedID_fkey"
            columns: ["FollowedID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Follows_FollowerID_fkey"
            columns: ["FollowerID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      General: {
        Row: {
          ArticleID: number
          Body: Json
          created_at: string
          likes: number
          PlaylistID: number | null
          Thumbnailurl: string | null
          Title: string
          UserID: string
          view: number
        }
        Insert: {
          ArticleID?: number
          Body: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title: string
          UserID?: string
          view?: number
        }
        Update: {
          ArticleID?: number
          Body?: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title?: string
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "General_PlaylistID_fkey"
            columns: ["PlaylistID"]
            isOneToOne: false
            referencedRelation: "Playlist"
            referencedColumns: ["PlaylistID"]
          },
          {
            foreignKeyName: "General_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      LiveReport: {
        Row: {
          ArtistName: string | null
          Body: Json
          created_at: string
          likes: number
          LiveReportID: number
          PlaylistID: number | null
          Thumbnailurl: string | null
          Title: string
          UserID: string
          view: number
        }
        Insert: {
          ArtistName?: string | null
          Body: Json
          created_at?: string
          likes?: number
          LiveReportID?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title: string
          UserID?: string
          view?: number
        }
        Update: {
          ArtistName?: string | null
          Body?: Json
          created_at?: string
          likes?: number
          LiveReportID?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title?: string
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "LiveReport_PlaylistID_fkey"
            columns: ["PlaylistID"]
            isOneToOne: false
            referencedRelation: "Playlist"
            referencedColumns: ["PlaylistID"]
          },
          {
            foreignKeyName: "LiveReport_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Playlist: {
        Row: {
          created_at: string
          PlaylistID: number
          PlaylistTitle: string | null
          UserID: string
        }
        Insert: {
          created_at?: string
          PlaylistID?: number
          PlaylistTitle?: string | null
          UserID?: string
        }
        Update: {
          created_at?: string
          PlaylistID?: number
          PlaylistTitle?: string | null
          UserID?: string
        }
        Relationships: [
          {
            foreignKeyName: "Playlist_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      PlaylistArticle: {
        Row: {
          ArticleID: number
          Body: Json
          created_at: string
          likes: number
          PlaylistID: number | null
          Thumbnailurl: string | null
          Title: string
          UserID: string
          view: number
        }
        Insert: {
          ArticleID?: number
          Body: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title: string
          UserID?: string
          view?: number
        }
        Update: {
          ArticleID?: number
          Body?: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          Thumbnailurl?: string | null
          Title?: string
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "PlaylistArticle_PlaylistID_fkey"
            columns: ["PlaylistID"]
            isOneToOne: false
            referencedRelation: "Playlist"
            referencedColumns: ["PlaylistID"]
          },
          {
            foreignKeyName: "PlaylistArticle_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      PlaylistSongs: {
        Row: {
          PlaylistID: number
          SongID: string
        }
        Insert: {
          PlaylistID?: number
          SongID: string
        }
        Update: {
          PlaylistID?: number
          SongID?: string
        }
        Relationships: [
          {
            foreignKeyName: "PlaylistSongs_PlaylistID_fkey"
            columns: ["PlaylistID"]
            isOneToOne: false
            referencedRelation: "Playlist"
            referencedColumns: ["PlaylistID"]
          },
        ]
      }
      Post: {
        Row: {
          Body: string
          created_at: string
          EntryID: number
          ImageUrl: Json 
          likes: number
          UserID: string
          view: number
        }
        Insert: {
          Body: string
          created_at?: string
          EntryID?: number
          ImageUrl?: Json 
          likes?: number
          UserID?: string
          view?: number
        }
        Update: {
          Body?: string
          created_at?: string
          EntryID?: number
          ImageUrl?: Json 
          likes?: number
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "PostAndComment_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Postlikes: {
        Row: {
          PostID: number
          UserID: string
        }
        Insert: {
          PostID?: number
          UserID?: string
        }
        Update: {
          PostID?: number
          UserID?: string
        }
        Relationships: [
          {
            foreignKeyName: "PostLikes_EntryID_fkey"
            columns: ["PostID"]
            isOneToOne: true
            referencedRelation: "Post"
            referencedColumns: ["EntryID"]
          },
          {
            foreignKeyName: "PostLikes_UserID_fkey"
            columns: ["UserID"]
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
      Reply: {
        Row: {
          Body: string
          created_at: string
          EntryID: number
          ImageUrl: Json | null
          likes: number
          ParentID: number
          UserID: string
          view: number
        }
        Insert: {
          Body: string
          created_at?: string
          EntryID?: number
          ImageUrl?: Json | null
          likes?: number
          ParentID: number
          UserID?: string
          view?: number
        }
        Update: {
          Body?: string
          created_at?: string
          EntryID?: number
          ImageUrl?: Json | null
          likes?: number
          ParentID?: number
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "Reply_ParentID_fkey"
            columns: ["ParentID"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["EntryID"]
          },
          {
            foreignKeyName: "Reply_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Review: {
        Row: {
          ArtistName: string | null
          Body: Json
          created_at: string
          likes: number
          PlaylistID: number | null
          ReviewID: number
          Thumbnailurl: string | null
          Title: string
          UserID: string
          view: number
        }
        Insert: {
          ArtistName?: string | null
          Body: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          ReviewID?: number
          Thumbnailurl?: string | null
          Title: string
          UserID?: string
          view?: number
        }
        Update: {
          ArtistName?: string | null
          Body?: Json
          created_at?: string
          likes?: number
          PlaylistID?: number | null
          ReviewID?: number
          Thumbnailurl?: string | null
          Title?: string
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "Review_PlaylistID_fkey"
            columns: ["PlaylistID"]
            isOneToOne: false
            referencedRelation: "Playlist"
            referencedColumns: ["PlaylistID"]
          },
          {
            foreignKeyName: "Review_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      TodaysSong: {
        Row: {
          Body: string
          created_at: string
          likes: number
          SongID: string
          TodaysSongID: number
          UserID: string
          view: number
        }
        Insert: {
          Body: string
          created_at?: string
          likes?: number
          SongID: string
          TodaysSongID?: number
          UserID?: string
          view?: number
        }
        Update: {
          Body?: string
          created_at?: string
          likes?: number
          SongID?: string
          TodaysSongID?: number
          UserID?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "Today'sSong_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          Bio: string
          crreated_at: string
          FavArtist: Json | null
          Follow: number
          Followed: number
          IconImageUrl: string
          ProfileID: string
          UserID: string
          UserName: string
        }
        Insert: {
          Bio: string
          crreated_at?: string
          FavArtist?: Json | null
          Follow?: number
          Followed?: number
          IconImageUrl: string
          ProfileID: string
          UserID?: string
          UserName: string
        }
        Update: {
          Bio?: string
          crreated_at?: string
          FavArtist?: Json | null
          Follow?: number
          Followed?: number
          IconImageUrl?: string
          ProfileID?: string
          UserID?: string
          UserName?: string
        }
        Relationships: [
          {
            foreignKeyName: "Users_UserID_fkey"
            columns: ["UserID"]
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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
