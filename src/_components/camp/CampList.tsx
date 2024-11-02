"use client";

import CampCard from "@/_components/camp/CampCard";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import Pagination from "../pagination/Pagination";
import usePagination from "../pagination/hooks/pagination";
import { useEffect } from "react";

type CampListProps = {
  camps: Camp[];
  itemsPerPage: number;
  paramsId: string;
};

const CampList = ({ camps, itemsPerPage, paramsId }: CampListProps) => {
  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: camps, itemsPerPage, paramsId });

  // 페이지 번호가 변경되면 해당 페이지로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 상단으로 스크롤
  }, [page]);

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
