export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      camp: {
        Row: {
          addr1: string;
          contentId: number;
          created_at: string;
          doNm: string | null;
          facltNm: string;
          firstImageUrl: string | null;
          imgUrls: string[];
          induty: string | null;
          intro: string | null;
          lineIntro: string | null;
          mapX: number;
          mapY: number;
          sigunguNm: string | null;
        };
        Insert: {
          addr1: string;
          contentId: number;
          created_at?: string;
          doNm?: string | null;
          facltNm: string;
          firstImageUrl?: string | null;
          imgUrls?: Json;
          induty?: string | null;
          intro?: string | null;
          lineIntro?: string | null;
          mapX: number;
          mapY: number;
          sigunguNm?: string | null;
        };
        Update: {
          addr1?: string;
          contentId?: number;
          created_at?: string;
          doNm?: string | null;
          facltNm?: string;
          firstImageUrl?: string | null;
          imgUrls?: Json;
          induty?: string | null;
          intro?: string | null;
          lineIntro?: string | null;
          mapX?: number;
          mapY?: number;
          sigunguNm?: string | null;
        };
        Relationships: [];
      };
      chat_attendee: {
        Row: {
          created_at: string;
          id: number;
          is_pin: boolean;
          last_read_message_id: number | null;
          room_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_pin?: boolean;
          last_read_message_id?: number | null;
          room_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_pin?: boolean;
          last_read_message_id?: number | null;
          room_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_attendee_last_read_message_id_fkey";
            columns: ["last_read_message_id"];
            isOneToOne: false;
            referencedRelation: "chat_message";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_attendee_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_attendee_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      chat_message: {
        Row: {
          created_at: string;
          id: number;
          message: string;
          room_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message: string;
          room_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string;
          room_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_message_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_message_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      chat_room: {
        Row: {
          created_at: string;
          id: number;
          meet_id: number | null;
          sos_id: number | null;
          type: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          meet_id?: number | null;
          sos_id?: number | null;
          type?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          meet_id?: number | null;
          sos_id?: number | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_room_sos_id_fkey";
            columns: ["sos_id"];
            isOneToOne: false;
            referencedRelation: "sos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_room_type_id_fkey";
            columns: ["meet_id"];
            isOneToOne: false;
            referencedRelation: "meet";
            referencedColumns: ["id"];
          }
        ];
      };
      feed: {
        Row: {
          camp_id: number;
          desc: string | null;
          id: number;
          likesCount: number | null;
          profileImg: string;
          time: string | null;
          user_id: string;
        };
        Insert: {
          camp_id: number;
          desc?: string | null;
          id?: number;
          likesCount?: number | null;
          profileImg?: string;
          time?: string | null;
          user_id: string;
        };
        Update: {
          camp_id?: number;
          desc?: string | null;
          id?: number;
          likesCount?: number | null;
          profileImg?: string;
          time?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feed_camp_id_fkey";
            columns: ["camp_id"];
            isOneToOne: false;
            referencedRelation: "camp";
            referencedColumns: ["contentId"];
          },
          {
            foreignKeyName: "feed_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      meet: {
        Row: {
          content: string;
          contentId: number;
          created_at: string;
          deadline_date: string | null;
          deadline_headcount: number;
          end_date: Date;
          ground_type: string;
          id: number;
          is_day_trip: boolean;
          is_end: boolean | null;
          is_newbie: boolean;
          start_date: Date;
          supplies: string[];
          title: string;
          user_id: string;
        };
        Insert: {
          user_id: string;

          contentId: number;
          title: string;
          content: string;

          deadline_headcount: number;

          start_date: Date;
          end_date: Date;
          is_day_trip: boolean;

          ground_type: string;
          is_newbie: boolean;

          supplies: string[];

          deadline_date?: string | null;
          is_end?: boolean | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;

          contentId?: number;
          title?: string;
          content?: string;

          deadline_headcount?: number;

          start_date?: Date;
          end_date?: Date;
          is_day_trip?: boolean;

          ground_type?: string;
          is_newbie?: boolean;

          supplies?: string[];

          deadline_date?: string | null;
          is_end?: boolean | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meet_contentId_fkey";
            columns: ["contentId"];
            isOneToOne: false;
            referencedRelation: "camp";
            referencedColumns: ["contentId"];
          }
        ];
      };
      meet_attendee: {
        Row: {
          created_at: string;
          id: number;
          meet_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          meet_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          meet_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "meet_attendee_meet_id_fkey";
            columns: ["meet_id"];
            isOneToOne: false;
            referencedRelation: "meet";
            referencedColumns: ["id"];
          }
        ];
      };
      profile: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          id: string;
          nickname: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          nickname: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          nickname?: string;
          user_name?: string | null;
        };
        Relationships: [];
      };
      review: {
        Row: {
          at: string;
          campId: string;
          content: string;
          id: string;
          rating: number;
          title: string;
          updatede: string | null;
          userId: string;
        };
        Insert: {
          at: string;
          campId: string;
          content: string;
          id?: string;
          rating: number;
          title: string;
          updatede?: string | null;
          userId?: string;
        };
        Update: {
          at?: string;
          campId?: string;
          content?: string;
          id?: string;
          rating?: number;
          title?: string;
          updatede?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "review_campId_fkey";
            columns: ["campId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      sos: {
        Row: {
          contents: string | null;
          created_at: string;
          id: number;
          sos_category: string | null;
          sos_image: string | null;
          title: string | null;
        };
        Insert: {
          contents?: string | null;
          created_at?: string;
          id?: number;
          sos_category?: string | null;
          sos_image?: string | null;
          title?: string | null;
        };
        Update: {
          contents?: string | null;
          created_at?: string;
          id?: number;
          sos_category?: string | null;
          sos_image?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_meet_detail:
        | {
            Args: Record<PropertyKey, never>;
            Returns: Json;
          }
        | {
            Args: {
              meet_id: number;
            };
            Returns: Json;
          };
      get_meet_list: {
        Args: Record<PropertyKey, never>;
        Returns: {
          attendee_count: number;
          meet: unknown;
          camp: unknown;
        }[];
      };
      get_meet_list1: {
        Args: Record<PropertyKey, never>;
        Returns: {
          attendee_count: number;
          meet: unknown;
          camp: unknown;
        }[];
      };
      get_meet_list2: {
        Args: Record<PropertyKey, never>;
        Returns: {
          attendee_count: number;
          meet: unknown;
          camp: unknown;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
