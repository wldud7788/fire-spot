import {
  GOCAMPING_HOST,
  GOCAMPING_KEY,
  GOCAMPING_SEARCH,
  GOCAMPING_ALL
} from "@/_utils/api/apiKey";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");
    const regions = searchParams.get("regions");

    // 새로운 필터 파라미터들
    const petAllowed = searchParams.get("petAllowed"); // "가능" 또는 "불가능"
    const facilities = searchParams.get("facilities")?.split(","); // 콤마로 구분된 시설 목록
    const campingType = searchParams.get("campingType")?.split(","); // 콤마로 구분된 업종 목록
    const amenities = searchParams.get("amenities")?.split(","); // 콤마로 구분된 편의시설 목록
    const groundTypes = searchParams.get("groundTypes")?.split(","); // 콤마로 구분된 바닥 유형

    let apiUrl;

    if (!keyword) {
      apiUrl = `${GOCAMPING_HOST}${GOCAMPING_ALL}?serviceKey=${GOCAMPING_KEY}&numOfRows=10&pageNo=max&MobileOS=ETC&MobileApp=TestApp&_type=json`;
    } else {
      apiUrl = `${GOCAMPING_HOST}${GOCAMPING_SEARCH}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=${encodeURIComponent(keyword)}&pageNo=1&numOfRows=10`;
    }

    const res = await fetch(apiUrl);
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

    // 애완동물 출입 필터링
    if (petAllowed) {
      items = items.filter((camp) => camp.animalCmgCl === petAllowed);
    }

    // 부대시설 필터링
    if (facilities && facilities.length > 0) {
      items = items.filter((camp) =>
        facilities.every((facility) => camp.sbrsCl?.includes(facility))
      );
    }

    // 업종(종류) 필터링
    if (campingType && campingType.length > 0) {
      items = items.filter((camp) =>
        campingType.some((type) => camp.induty?.includes(type))
      );
    }

    // 편의시설 필터링
    if (amenities && amenities.length > 0) {
      items = items.filter((camp) =>
        amenities.some(
          (amenity) =>
            camp.glampInnerFclty?.includes(amenity) ||
            camp.caravInnerFclty?.includes(amenity)
        )
      );
    }

    // 바닥 유형 필터링
    if (groundTypes && groundTypes.length > 0) {
      items = items.filter((camp) => {
        return groundTypes.some((type) => {
          switch (type) {
            case "잔디":
              return Number(camp.siteBottomCl1) > 0;
            case "파쇄석":
              return Number(camp.siteBottomCl2) > 0;
            case "테크":
              return Number(camp.siteBottomCl3) > 0;
            case "자갈":
              return Number(camp.siteBottomCl4) > 0;
            case "맨흙":
              return Number(camp.siteBottomCl5) > 0;
            default:
              return false;
          }
        });
      });
    }

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
