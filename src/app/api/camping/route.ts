import {
  GOCAMPING_HOST,
  GOCAMPING_KEY,
  GOCAMPING_SEARCH,
  GOCAMPING_ALL
} from "@/_utils/api/apiKey";
import { QUERYSTRING } from "@/_utils/common/constant";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");
    const regions = searchParams.get("regions");
    let apiUrl;

    if (!keyword) {
      apiUrl = `${GOCAMPING_HOST}${GOCAMPING_ALL}?serviceKey=${GOCAMPING_KEY}&numOfRows=50&pageNo=max&${QUERYSTRING}`;
    } else {
      apiUrl = `${GOCAMPING_HOST}${GOCAMPING_SEARCH}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=${encodeURIComponent(keyword)}&pageNo=1&numOfRows=50`;
    }

    const res = await fetch(apiUrl, {
      next: {
        revalidate: 86400
      }
    });
    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("API 요청 오류:", errorMessage);
      throw new Error("검색 패치 오류");
    }

    const data = await res.json();
    let items: Camp[] = data.response.body.items.item;

    // 지역 필터링
    items = regions
      ? regions === "전국"
        ? items
        : items.filter((camp) => camp.doNm === regions)
      : items;

    return new Response(JSON.stringify(items), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(`응답 실패: ${error}`, {
      status: 500
    });
  }
};
