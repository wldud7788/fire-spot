"use client";

import CampCard from "@/_components/camp/CampCard";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useState } from "react";
import Pagination from "../pagination/Pagination";

type CampListProps = {
  camps: Camp[];
  itemsPerPage: number;
};

const CampList = ({ camps, itemsPerPage }: CampListProps) => {
  const [page, setPage] = useState<number>(1);

  const firstItems = (page - 1) * itemsPerPage;
  const lastItems = page * itemsPerPage;
  const currentItems = camps.slice(firstItems, lastItems);
  const totalPages = Math.round(camps.length / itemsPerPage);

  const handleMovePagePrev = () => {
    if (page <= 1) return false;
    setPage((prev) => prev - 1);
  };

  const handleMovePageNext = () => {
    if (page == totalPages) return false;
    setPage((prev) => prev + 1);
  };

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
        onMovePagePrev={handleMovePagePrev}
        onMovePageNext={handleMovePageNext}
      />
    </div>
  );
};

export default CampList;
