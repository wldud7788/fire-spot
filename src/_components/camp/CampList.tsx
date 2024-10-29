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
      <div className="list_box flex flex-wrap gap-[30px]">
        {camps.map((camp) => (
          <CampCard key={camp.contentId} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default CampList;
