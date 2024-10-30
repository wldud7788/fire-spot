"use client";

import { createClient } from "@/_utils/supabase/client";

const supabase = createClient();

// 채팅방 인원 파악
export const countParticipants = async (room_id: string) => {
  try {
    const { data: participants, error: participantsNumberError } =
      await supabase
        .from("chat_participants")
        .select("id")
        .eq("room_id", room_id);

    if (participantsNumberError) {
      console.log("participantsNumberError", participantsNumberError.message);
      throw participantsNumberError;
    }

    const participantsNumber = participants.length;

    return participantsNumber;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 모집인원 파악
export const getRecruitingNumber = async (room_id: string) => {
  try {
    const { data: recruiting, error: recruitingNumberError } = await supabase
      .from("chat_rooms_info")
      .select("meet(deadline_headcount)")
      .eq("id", room_id);

    if (recruitingNumberError) {
      console.log("recruitingNumberError", recruitingNumberError.message);
      throw recruitingNumberError;
    }

    const recruitingNumber = recruiting[0]?.meet?.deadline_headcount || 0;

    return recruitingNumber;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// action의 모집상태 변경하기(채팅방 인원 === 모집인원 일때)
// 1) mode가 'in'(단체방에 참가하려는 경우) - '모집마감'처리
// 2) mode가 'out'(단체방에서 나가려는 경우) - '모집중'처리
export const changeRecruitingState = async ({
  action_id,
  mode
}: {
  action_id: string;
  mode: string;
}) => {
  try {
    const is_recruiting = mode === "in" ? false : true;

    const { error } = await supabase
      .from("individual_green_actions")
      .update({ is_recruiting })
      .eq("id", action_id);

    if (error) {
      console.log("error", error.message);
      throw error;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};
