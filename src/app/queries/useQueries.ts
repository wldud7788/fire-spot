import { Camp } from "../(pages)/camps/types/Camp";
import { useQuery } from "@tanstack/react-query";

// 따로 분리해서
export const fetchSearchData = async (
  keyword?: string,
  region?: string
): Promise<Camp[]> => {
  const response = await fetch(
    `/api/camping?keyword=${keyword || ""}&regions=${region || ""}`
  );
  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  const data: Camp[] = await response.json();
  return data;
};

export const useCamps = (keyword?: string, region?: string) => {
  return useQuery<Camp[], Error>({
    queryKey: ["searchCamp", keyword, region],
    queryFn: () => fetchSearchData(keyword, region),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: true
  });
};
