export interface Chat {
  id: number;
  participant_uid: string;
  message: string;
  sendTime: string;
  room_id: number;
}

export interface Chat_participants {
  id: number;
  created_at: string;
  room_id: number;
  participant_uid: string;
  participant_type: string;
}

export interface Chat_rooms_info {
  id: number;
  created_at: string;
  owner_id: string;
  room_type: string;
  recruit_number: number;
}
