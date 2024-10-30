"use server";

import { CampApiResponse } from "@/app/(pages)/camps/types/Camp";
import { GOAMPING_KEY, GOAMPING_URL } from "../api/apiKey";

export const getTotalData = async (numOfRows?: number) => {
  try {
    const res = await fetch(
      `${GOAMPING_URL}?serviceKey=${GOAMPING_KEY}&numOfRows=${numOfRows ? numOfRows : 4040}&pageNo=max&MobileOS=ETC&MobileApp=TestApp&_type=json`,
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
