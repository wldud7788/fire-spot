import { getTotalData } from "@/_utils/serverActions/campApi";
import React from "react";
import CampCard from "../camp/CampCard";

const MainCamps = async () => {
  const camps = await getTotalData(4);

  if (!camps) return <div>캠프 데이터가 없습니다.</div>;
  return (
    <ul className="mt-[40px] flex gap-[20px]">
      {camps.map((camp) => {
        return (
          <li className="main_camps flex-1" key={camp.contentId}>
            <CampCard camp={camp} />
          </li>
        );
      })}
    </ul>
  );
};

export default MainCamps;
