import React from "react";

import CampCard from "@/_components/camp/CampCard";
import { campCard } from "@/app/(pages)/camps/types/Champ";

const CampList = () => {
  const campingData: campCard[] = [
    {
      id: 0,
      img: "/assets/images/@dumy-img01.png",
      title: "초코 캠핑러 모임",
      location: "전남 영암군 영암읍 녹암대동보길 69-10 락온 글램핑",
      lo: "부천시",
      date: "10월 25일 · 8시30분",
      personnel: "20명모집",
      personnelCount01: 20,
      personnelCount02: 10,
      state: true
    },
    {
      id: 1,
      img: "/assets/images/@dumy-img02.png",
      title: "초코 캠핑러 모임 2",
      location: "전남 영암군 영암읍 녹암대동보길 69-10 락온 글램핑",
      lo: "부천시",
      date: "10월 25일 · 8시30분",
      personnel: "20명모집",
      personnelCount01: 10,
      personnelCount02: 6,
      state: true
    }
  ];

  return (
    <div className="camp_list">
      <div className="list_box flex gap-[30px]">
        {campingData.map((camp) => {
          return <CampCard key={camp.id} campingData={camp} />;
        })}
      </div>
    </div>
  );
};

export default CampList;
