import {
  GOCAMPING_ALL,
  GOCAMPING_HOST,
  GOCAMPING_KEY,
  GOCAMPING_SEARCH
} from "@/_utils/api/apiKey";
import { QUERYSTRING } from "@/_utils/common/constant";
import { CampApiResponse } from "@/app/(pages)/camps/types/Camp";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const numOfRows = searchParams.get("numOfRows");
  const keyword = searchParams.get("keyword");
  const regions = searchParams.get("regions");

  let apiUrl;
  if (!keyword) {
    apiUrl = `${GOCAMPING_HOST}${GOCAMPING_ALL}?serviceKey=${GOCAMPING_KEY}&numOfRows=${numOfRows ? numOfRows : 4044}&pageNo=${page ? page : "max"}&${QUERYSTRING}`;
  } else {
    apiUrl = `${GOCAMPING_HOST}${GOCAMPING_SEARCH}?serviceKey=${GOCAMPING_KEY}&${QUERYSTRING}&keyword=${encodeURIComponent(keyword)}&pageNo=1&numOfRows=50`;
  }

  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  try {
    const data: CampApiResponse = await res.json();
    let items = data.response.body.items.item;

    // 지역 필터링 추가
    if (regions && regions !== "전국") {
      items = items.filter((camp) => camp.doNm === regions);
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Failed to fetch data", { status: 500 });
  }
}
