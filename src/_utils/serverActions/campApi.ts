"use server";

import { CampApiResponse } from "@/app/(pages)/camps/types/Camp";
import {
  GOAMPING_IMAGE_LIST_URL,
  GOAMPING_KEY,
  GOAMPING_URL
} from "../api/apiKey";
import { createClient } from "../supabase/server";
import { CampFromDB } from "@/app/(pages)/meets/types/camp.types";

export const getTotalData = async () => {
  try {
    const res = await fetch(
      `${GOAMPING_URL}?serviceKey=${GOAMPING_KEY}&numOfRows=4041&pageNo=max&MobileOS=ETC&MobileApp=TestApp&_type=json`,
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
    return null;
  }
};

export const getCampData = async (contentId: string) => {
  try {
    const res = await fetch(
      `${GOAMPING_URL}?serviceKey=${GOAMPING_KEY}&numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`,
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
    console.log("API Response:", data);

    // contentId에 맞는 캠프 데이터 찾기
    const camp = data.response.body.items.item.find(
      (item) => item.contentId === contentId
    );

    return camp || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getCampImgList = async (contentId: string) => {
  const IMAGE_SEARCH_URL = `${GOAMPING_IMAGE_LIST_URL}?serviceKey=${GOAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=30&_type=json&contentId=`;

  try {
    const res = await fetch(IMAGE_SEARCH_URL + contentId);
    const data = await res.json();

    return data.response.body.items.item;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getCampDataFromDB = async (
  contentId: string
): Promise<CampFromDB> => {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("camp")
      .select()
      .eq("contentId", contentId)
      // .returns<CampResponse>();
      .single();
    return data;
  } catch (error) {
    throw new Error("Error getCampDataFromDB ");
  }
};
