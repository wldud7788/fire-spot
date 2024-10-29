"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetWithCamp } from "../types/meet.types";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { Camp } from "../../camps/types/Camp";
import { GOAMPING_IMAGE_LIST_URL, GOAMPING_KEY } from "@/_utils/api/apiKey";
import {
  getCampDataFromDB,
  getCampImgList
} from "@/_utils/serverActions/campApi";
import { CampImageList, CampToDB } from "../types/camp.types";

const getMeetDetail = async ({
  meetId
}: {
  meetId: string;
}): Promise<MeetWithCamp> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_meet_detail", {
    meet_id: meetId
  });
  if (error) {
    throw new Error("getMeetDetail Error");
  }

  data.meet.attendee_count = data.attendee_count;

  return { ...data };
};

/** 사용자가 모임작성에서 검색 후 '클릭' 한 캠핑장은 DB에 저장 */
const upsertCamp = async (camp: Camp & { imgUrls?: string[] }) => {
  const supabase = await createClient();

  // const { contentId, ...campWithoutId } = camp;
  // const { contentId, ...campWithoutId } = camp;

  const {
    contentId,
    mapX,
    mapY,
    addr1,
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
      lineIntro,
      firstImageUrl,
      imgUrls
    })
    .select();

  if (error) {
    throw new Error("camp upsert Error");
  }

  // const campFromDB = await getCampDataFromDB(camp.contentId);

  // if (!campFromDB) {
  //   const campImgList = await getCampImgList(camp.contentId);

  //   const campToDB = { ...camp, imgUrls: campImgList };

  // }
};

export { getMeetDetail, upsertCamp };
