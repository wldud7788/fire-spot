"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetInsert, MeetUpdate, MeetWithCamp } from "../types/meet.types";
import { Camp } from "../../camps/types/Camp";
import { getCampImgList } from "@/_utils/serverActions/campApi";
import { CampImageList, CampInsert } from "../types/camp.types";
import { postMeetAttendee } from "./meetAttendAction";
import { Database } from "../../../../../database.types";
import { revalidatePath } from "next/cache";

type Test = Database["public"]["Tables"]["meet"]["Insert"];

const postMeet = async (meet: Test) => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();

    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data: meetResult, error: meetError } = await supabase
      .from("meet")
      .insert({ ...meet, user_id: userId })
      .select()
      .single();
    if (meetError) {
      throw new Error("postMeet Error");
    }

    await postMeetAttendee(meetResult.id ?? 0);
    revalidatePath("/meets");
    return true;
  } catch (e) {
    console.error("postMeet Error", e);
  }
};

const patchMeet = async (meetId: string, meet: MeetUpdate) => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();

    const userId = userData.data.user?.id;

    const { created_at, ...meetData } = meet;

    const { data: meetResult, error: meetError } = await supabase
      .from("meet")
      .update({ ...meetData })
      .eq("id", meetId);
    // .select()
    // .single();
    if (meetError) {
      throw new Error("postMeet Error");
    }
    revalidatePath("/meets");
    return true;

    // postMeetAttendee(meetResult.id);
  } catch (e) {
    console.error("postMeet Error", e);
  }
};

/** 사용자가 모임작성에서 검색 후 '클릭' 한 캠핑장은 DB에 저장 */
const upsertCamp = async (camp: CampInsert) => {
  const supabase = await createClient();

  const {
    contentId,
    mapX,
    mapY,
    addr1,
    doNm,
    sigunguNm,
    induty,
    facltNm,
    lineIntro,
    firstImageUrl,
    featureNm
  } = camp;

  const imgUrls = await getCampImgList(contentId);

  // TODO 타입 에러나는거 한번 싹 정리해야됨
  const { error } = await supabase
    .from("camp")
    .upsert({
      contentId,
      mapX,
      mapY,
      addr1,
      induty,
      facltNm,
      doNm,
      sigunguNm,
      lineIntro,
      firstImageUrl,
      imgUrls,
      featureNm
    })
    .select();

  if (error) {
    throw new Error("camp upsert Error");
  }
};

export { postMeet, patchMeet, upsertCamp };
