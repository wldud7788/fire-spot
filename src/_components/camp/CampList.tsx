"use client";

import CampCard from "@/_components/camp/CampCard";
import Pagination from "../pagination/Pagination";
import usePagination from "../pagination/hooks/pagination";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTotalData } from "@/_utils/api/campsApi";

type CampListProps = {
  itemsPerPage: number;
  paramsId: string;
};

const CampList = ({ itemsPerPage, paramsId }: CampListProps) => {
  const {
    data: camps,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => fetchTotalData(),
    staleTime: Infinity
  });

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: camps || [], itemsPerPage, paramsId });

  // 페이지 번호가 변경되면 해당 페이지로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 상단으로 스크롤
  }, [page]);

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError || !camps) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="camp_list">
      <ul className="list_box flex flex-wrap gap-[30px]">
        {currentItems.map((camp) => (
          <li key={camp.contentId} className="w-[calc(25%-30px)]">
            <CampCard camp={camp} listParamsId={paramsId} />
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        onMovePagePrev={movePagePrev}
        onMovePageNext={movePageNext}
      />
    </div>
  );
};

export default CampList;
