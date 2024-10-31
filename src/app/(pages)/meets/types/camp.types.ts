export interface CampFromDB {
  contentId: number | string;
  mapX: number;
  mapY: number;
  addr1: string;
  doNm: string;
  sigunguNm: string;
  induty: string;
  facltNm: string;
  lineIntro: string;
  firstImageUrl: string;
  imgUrls: string[];
  created_at: string;
}

export interface CampToDB {
  contentId: string;
  mapX: number;
  mapY: number;
  addr1: string;
  doNm: string;
  sigunguNm: string;
  induty: string;
  facltNm: string;
  lineIntro: string;
  imgUrls: string[];
  firstImageUrl: string;
}

export interface CampImageList {
  imageUrl: string;
  contentId: string;
  serialnum: string;
  createdtime: string;
  modifiedtime: string;
}
