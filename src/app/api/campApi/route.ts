import {
  GOCAMPING_ALL,
  GOCAMPING_HOST,
  GOCAMPING_KEY
} from "@/_utils/api/apiKey";
import { QUERYSTRING } from "@/_utils/common/constant";
import { CampApiResponse } from "@/app/(pages)/camps/types/Camp";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 요청 URL에서 page와 numOfRows를 가져오기 위해 new URL(request.url)을 사용하여 쿼리 파라미터를 파싱합니다.
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const numOfRows = searchParams.get("numOfRows");

  const res = await fetch(
    `${GOCAMPING_HOST}${GOCAMPING_ALL}?serviceKey=${GOCAMPING_KEY}&numOfRows=${numOfRows ? numOfRows : 4044}&pageNo=${page ? page : "max"}&${QUERYSTRING}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  try {
    const data: CampApiResponse = await res.json();
    return NextResponse.json(data.response.body.items.item);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Failed to fetch data", { status: 500 });
  }
}
