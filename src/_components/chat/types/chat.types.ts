import { Database } from "../../../../database.types";

export type ChatMessageSelect =
  Database["public"]["Tables"]["chat_message"]["Row"];
export type ChatMessageInsert =
  Database["public"]["Tables"]["chat_message"]["Insert"];

export type ChatAttendeeSelect =
  Database["public"]["Tables"]["chat_attendee"]["Row"];
export type ChatAttendeeInsert =
  Database["public"]["Tables"]["chat_attendee"]["Insert"];

export type ChatRoomSelect = Database["public"]["Tables"]["chat_room"]["Row"];
export type ChatRoomInsert =
  Database["public"]["Tables"]["chat_room"]["Insert"];
