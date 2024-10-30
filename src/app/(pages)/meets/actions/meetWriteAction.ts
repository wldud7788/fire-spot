"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetForm, MeetWithCamp } from "../types/meet.types";
import { Camp } from "../../camps/types/Camp";
import { getCampImgList } from "@/_utils/serverActions/campApi";
import { CampImageList } from "../types/camp.types";
import { postMeetAttendee } from "./meetAttendAction";

const postMeet = async (meet: MeetForm) => {
  const supabase = await createClient();

  // TODO 서버용 getUser ?
  try {
    const userData = await supabase.auth.getUser();

    const userId = userData.data.user?.id;

    const { data: meetResult, error: meetError } = await supabase
      .from("meet")
      .insert({ ...meet, user_id: userId })
      .select()
      .single();
    if (meetError) {
      throw new Error("postMeet Error");
    }

    postMeetAttendee(meetResult.id);
  } catch (e) {
    console.error("postMeet Error", e);
  }
};

/** 사용자가 모임작성에서 검색 후 '클릭' 한 캠핑장은 DB에 저장 */
const upsertCamp = async (camp: Camp & { imgUrls?: string[] }) => {
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
    firstImageUrl
  } = camp;
  const campImageList: CampImageList[] = await getCampImgList(contentId);

  const imgUrls = campImageList.map((img) => img.imageUrl);

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
      imgUrls
    })
    .select();

  if (error) {
    throw new Error("camp upsert Error");
  }
};

export { postMeet, upsertCamp };
