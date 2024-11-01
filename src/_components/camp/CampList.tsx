"use client";

import CampCard from "@/_components/camp/CampCard";
import { Camp } from "@/app/(pages)/camps/types/Camp";

type CampListProps = {
  camps: Camp[];
};

// CampList 컴포넌트가 서버 컴포넌트로 정의된 경우
const CampList = ({ camps }: CampListProps) => {
  return (
    <div className="camp_list">
      <ul className="list_box flex flex-wrap gap-[30px]">
        {camps.map((camp) => (
          <li key={camp.contentId} className="w-[calc(25%-30px)]">
            <CampCard camp={camp} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampList;
