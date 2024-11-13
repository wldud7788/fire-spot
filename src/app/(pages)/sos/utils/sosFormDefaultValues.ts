import { SosWithCamp, SosWithCampInsert } from "../types/sos.types";

export const sosFormDefaultValues: SosWithCamp = {
  sos: {
    id: 0,
    contentId: 0,
    title: "",
    content: "",
    type: "help",
    tag: [],
    created_at: new Date().toISOString()
  },
  camp: {
    contentId: 0,
    mapX: 0,
    mapY: 0,
    addr1: "",
    doNm: "",
    sigunguNm: "",
    intro: "",
    induty: "",
    facltNm: "",
    lineIntro: "",
    firstImageUrl: "",
    imgUrls: [],
    created_at: new Date().toISOString()
  },
  profile: {
    avatar_url: "",
    created_at: "",
    email: "",
    id: "",
    nickname: "",
    user_name: ""
  }
};
