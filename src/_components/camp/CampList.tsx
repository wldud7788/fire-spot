"use client";

import CampCard from "@/_components/camp/CampCard";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import Pagination from "../pagination/Pagination";
import usePagination from "../pagination/pagination-hook";

type CampListProps = {
  camps: Camp[];
  itemsPerPage: number;
  paramsId: string;
};

const CampList = ({ camps, itemsPerPage, paramsId }: CampListProps) => {
  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: camps, itemsPerPage, paramsId });

  return (
    <div className="camp_list">
      <ul className="list_box flex flex-wrap gap-[30px]">
        {currentItems.map((camp) => (
          <li key={camp.contentId} className="w-[calc(25%-30px)]">
            <CampCard camp={camp} />
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
