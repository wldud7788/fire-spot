import React from "react";
import { campCard } from "./types/Champ";
import CampCard from "@/_components/camp/CampCard";

const CampList = () => {
  const campingData: campCard[] = [
    {
      id: 0,
      img: "https://d3ifb4xbksj7jo.cloudfront.net/medium_2021_12_26_12_15_24_34875d31d7.png",
      title: "초코 캠핑러 모임",
      location: "전남 영암군 영암읍 녹암대동보길 69-10 락온 글램핑",
      date: "10월 25일 · 8시30분",
      personnel: "20명모집",
      personnelCount01: 20,
      personnelCount02: 10,
      state: true
    },
    {
      id: 1,
      img: "https://m.%ED%95%A8%ED%8F%89%EC%B2%9C%EC%A7%80%EB%AA%B0.kr/file_data/hampyengm/2021/08/17/3627803313bc765bf1390a4c6ad34716.png",
      title: "초코 캠핑러 모임 2",
      location: "전남 영암군 영암읍 녹암대동보길 69-10 락온 글램핑",
      date: "10월 25일 · 8시30분",
      personnel: "20명모집",
      personnelCount01: 10,
      personnelCount02: 6,
      state: true
    }
  ];

  return (
    <div className="camp_list">
      {campingData.map((camp) => {
        return <CampCard key={camp.id} campingData={camp} />;
      })}
    </div>
  );
};

export default CampList;
