"use server";

import { CampApiResponse } from "@/app/(pages)/camps/types/Camp";
import {
  GOCAMPING_HOST,
  GOCAMPING_KEY,
  GOCAMPING_ALL,
  GOCAMPING_SEARCH,
  GOCAMPING_IMAGE
} from "../api/apiKey";
import { createClient } from "../supabase/server";
import {
  CampInsert,
  CampImageList,
  CampSelect
} from "@/app/(pages)/meets/types/camp.types";

export const getTotalData = async (page?: number, numOfRows?: number) => {
  try {
    const res = await fetch(
      `${GOCAMPING_HOST}${GOCAMPING_ALL}?serviceKey=${GOCAMPING_KEY}&numOfRows=${numOfRows ? numOfRows : 4044}&pageNo=${page ? page : "max"}&MobileOS=ETC&MobileApp=TestApp&_type=json`,
      {
        next: {
          revalidate: 86400
        }
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: CampApiResponse = await res.json();
    return data.response.body.items.item;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCampImgList = async (contentId: number): Promise<string[]> => {
  const IMAGE_SEARCH_URL = `${GOCAMPING_HOST}${GOCAMPING_IMAGE}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=30&_type=json&contentId=${contentId}`;

  try {
    const res = await fetch(IMAGE_SEARCH_URL);
    const data = await res.json();

    if (!data.response.body.items || data.response.body.items === "") {
      return [];
    }

    const campImageList: CampImageList[] = data.response.body.items.item;
    const imgUrls = campImageList.map((img) => img.imageUrl);
    return imgUrls;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getCampDataFromDB = async (
  contentId: number
): Promise<CampSelect> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("camp")
      .select()
      .eq("contentId", contentId)
      // .returns<CampResponse>();
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("캠핑 데이터가 없습니다.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getCampDataFromDB ");
  }
};
// TODO - 준열,지영 각자 쓰던 함수 통일 필요, numOfRows=100 설정 체크 필요

export const getSearchCampsData = async (keyword: string) => {
  try {
    const res = await fetch(
      `${GOCAMPING_HOST}${GOCAMPING_SEARCH}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=${encodeURIComponent(keyword)}&pageNo=1&numOfRows=100`,
      {
        next: {
          revalidate: 86400
        }
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.response.body.items.item;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
