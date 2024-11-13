import { MeetWithCamp } from "@/app/(pages)/meets/types/meet.types";

import {
  ChatRoomInfo,
  ChatRoomMessageInfo,
  ChatRoomTitle,
  ChatRoomType
} from "@/_components/chat/types/chat.types";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import { SosSelect, SosWithCamp } from "@/app/(pages)/sos/types/sos.types";

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
      bookmarks: {
        Row: {
          contentId: number;
          created_at: string;
          id: number;
          userId: string;
        };
        Insert: {
          contentId: number;
          created_at?: string;
          id?: number;
          userId: string;
        };
        Update: {
          contentId?: number;
          created_at?: string;
          id?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_contentId_fkey";
            columns: ["contentId"];
            isOneToOne: false;
            referencedRelation: "camp";
            referencedColumns: ["contentId"];
          },
          {
            foreignKeyName: "bookmarks_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
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
          featureNm?: string | null;
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
          featureNm?: string | null;
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
          featureNm?: string | null;
        };
        Relationships: [];
      };
      chat_attendee: {
        Row: {
          created_at: string;
          id: number;
          is_pin: boolean;
          last_read_message_id: number | null;
          is_first_read: boolean;
          room_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_pin?: boolean;
          last_read_message_id?: number | null;
          is_first_read?: boolean;
          room_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_pin?: boolean;
          last_read_message_id?: number | null;
          is_first_read?: true; // true 오타 아님 (false 업데이트할 경우가 없음)
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
          type: ChatRoomType;
        };
        Insert: {
          created_at?: string;
          id?: number;
          meet_id?: number | null;
          sos_id?: number | null;
          type?: ChatRoomType;
        };
        Update: {
          created_at?: string;
          id?: number;
          meet_id?: number | null;
          sos_id?: number | null;
          type?: ChatRoomType;
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
      follows: {
        Row: {
          created_at: string;
          follower_id: string | null;
          following_id: string | null;
          id: number;
        };
        Insert: {
          created_at?: string;
          follower_id?: string | null;
          following_id?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string;
          follower_id?: string | null;
          following_id?: string | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "\bfollows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profile";
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
          id: number;
          likes: number | null;
          title: string;
          updated: string | null;
          userId: string;
          rating: number;
          at: string;
          content: string;
          campId: number;
          img: string | null;
          time: string | null;
          date: string | null;
        };
        Insert: {
          at: string;
          campId: number;
          content: string;
          id?: string;
          likes?: number | null;
          rating: number;
          title: string;
          updated?: string | null;
          userId?: string;
        };
        Update: {
          at?: string;
          campId?: number;
          content?: string;
          id?: string;
          likes?: number | null;
          rating?: number;
          title?: string;
          updated?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "review_campId_fkey";
            columns: ["campId"];
            isOneToOne: false;
            referencedRelation: "camp";
            referencedColumns: ["contentId"];
          },
          {
            foreignKeyName: "review_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      sos: {
        Row: {
          content: string;
          contentId: number | null;
          created_at: string;
          id: number;
          tag: string[];
          title: string;
          type: string;
        };
        Insert: {
          content: string;
          tag: string[];
          title: string;
          type: string;
          contentId?: number | null;
          // id?: number;
          // created_at?: string;
        };
        Update: {
          content?: string;
          contentId?: number | null;
          tag?: string[];
          title?: string;
          type?: string;
          // id?: number;
          // created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sos_contentId_fkey";
            columns: ["contentId"];
            isOneToOne: false;
            referencedRelation: "camp";
            referencedColumns: ["contentId"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_meet_attendee_with_meet_and_camp: {
        Args: {
          user_id: string;
        };
        // Returns: {
        //   attendee_count: number;
        //   meet: MeetSelect;
        //   camp: CampSelect;
        // }[];
        Returns: MeetWithCamp[];
      };
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
      get_chat_room_list: {
        Args: Record<string, string>;
        Returns: ChatRoomInfo[];
      };
      get_chat_room_title: {
        Args: Record<string, number>;
        Returns: ChatRoomTitle[];
      };
      get_chat_message: {
        Args: Record<string, number | string>;
        Returns: ChatRoomMessageInfo[];
      };
      get_sos_list: {
        Args: Record<PropertyKey, never>;
        Returns: SosWithCamp[];
      };
      get_sos_detail: {
        Args: Record<string, number>;
        Returns: SosWithCamp[];
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
