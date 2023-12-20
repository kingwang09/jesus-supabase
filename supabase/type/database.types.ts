export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _CategoryToPost: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: "_CategoryToPost_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_CategoryToPost_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          }
        ]
      }
      array_test: {
        Row: {
          id: number
          number_array: number[] | null
          text_array: string[] | null
        }
        Insert: {
          id: number
          number_array?: number[] | null
          text_array?: string[] | null
        }
        Update: {
          id?: number
          number_array?: number[] | null
          text_array?: string[] | null
        }
        Relationships: []
      }
      array_test_original: {
        Row: {
          id: number
          textarray: string[] | null
        }
        Insert: {
          id: number
          textarray?: string[] | null
        }
        Update: {
          id?: number
          textarray?: string[] | null
        }
        Relationships: []
      }
      Category: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      Post: {
        Row: {
          authorId: number
          content: string | null
          id: number
          pinnedById: number | null
          published: boolean
          title: string
        }
        Insert: {
          authorId: number
          content?: string | null
          id?: number
          pinnedById?: number | null
          published?: boolean
          title: string
        }
        Update: {
          authorId?: number
          content?: string | null
          id?: number
          pinnedById?: number | null
          published?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Post_pinnedById_fkey"
            columns: ["pinnedById"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Profile: {
        Row: {
          id: number
          userId: number
        }
        Insert: {
          id?: number
          userId: number
        }
        Update: {
          id?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Profile_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      TimePeriod: {
        Row: {
          quarter: number
          total: number
          year: number
        }
        Insert: {
          quarter: number
          total: number
          year: number
        }
        Update: {
          quarter?: number
          total?: number
          year?: number
        }
        Relationships: []
      }
      User: {
        Row: {
          email: string
          extendedPetsData: Json | null
          id: number
          name: string | null
        }
        Insert: {
          email: string
          extendedPetsData?: Json | null
          id?: number
          name?: string | null
        }
        Update: {
          email?: string
          extendedPetsData?: Json | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      vote: {
        Row: {
          categoryNames: string[]
          createdAt: string
          endedAt: string | null
          id: number
          image: string | null
          isActive: boolean
          parentCategoryName: string
          startedAt: string | null
          title: Json | null
          updatedAt: string | null
        }
        Insert: {
          categoryNames?: string[]
          createdAt?: string
          endedAt?: string | null
          id?: number
          image?: string | null
          isActive?: boolean
          parentCategoryName: string
          startedAt?: string | null
          title?: Json | null
          updatedAt?: string | null
        }
        Update: {
          categoryNames?: string[]
          createdAt?: string
          endedAt?: string | null
          id?: number
          image?: string | null
          isActive?: boolean
          parentCategoryName?: string
          startedAt?: string | null
          title?: Json | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      vote_user_comment: {
        Row: {
          comment: string
          createdAt: string
          id: number
          isActive: boolean
          reportedUserIds: number[] | null
          updatedAt: string | null
          userId: number
          voteId: number
        }
        Insert: {
          comment: string
          createdAt?: string
          id?: number
          isActive?: boolean
          reportedUserIds?: number[] | null
          updatedAt?: string | null
          userId: number
          voteId: number
        }
        Update: {
          comment?: string
          createdAt?: string
          id?: number
          isActive?: boolean
          reportedUserIds?: number[] | null
          updatedAt?: string | null
          userId?: number
          voteId?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_vote_user_comment_voteId_vote_id"
            columns: ["voteId"]
            isOneToOne: false
            referencedRelation: "vote"
            referencedColumns: ["id"]
          }
        ]
      }
      vote_user_history: {
        Row: {
          categoryName: string
          createdAt: string
          id: number
          userId: number
          voteId: number
        }
        Insert: {
          categoryName: string
          createdAt?: string
          id?: number
          userId: number
          voteId: number
        }
        Update: {
          categoryName?: string
          createdAt?: string
          id?: number
          userId?: number
          voteId?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_vote_user_history_voteId_vote_id"
            columns: ["voteId"]
            isOneToOne: false
            referencedRelation: "vote"
            referencedColumns: ["id"]
          }
        ]
      }
      vote_winner_category: {
        Row: {
          brandCategoryId: number | null
          categoryName: string
          createdAt: string
          id: number
          isActive: boolean
          openStartedAt: string | null
          parentCategoryName: string
          updatedAt: string | null
          voteId: number
        }
        Insert: {
          brandCategoryId?: number | null
          categoryName: string
          createdAt?: string
          id?: number
          isActive?: boolean
          openStartedAt?: string | null
          parentCategoryName: string
          updatedAt?: string | null
          voteId: number
        }
        Update: {
          brandCategoryId?: number | null
          categoryName?: string
          createdAt?: string
          id?: number
          isActive?: boolean
          openStartedAt?: string | null
          parentCategoryName?: string
          updatedAt?: string | null
          voteId?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_vote_winner_category_voteId_vote_id"
            columns: ["voteId"]
            isOneToOne: false
            referencedRelation: "vote"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_vote_reporteduserids: {
        Args: {
          commentid: number
          userid: number
        }
        Returns: number
      }
      change_vote_user_history: {
        Args: {
          voteid: number
          userid: number
          categoryname: string
        }
        Returns: boolean
      }
      group_by_vote_user_history:
        | {
            Args: {
              voteid: number
            }
            Returns: {
              result: Json
            }[]
          }
        | {
            Args: {
              voteid: number
              total_count: number
            }
            Returns: {
              result: Json
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
