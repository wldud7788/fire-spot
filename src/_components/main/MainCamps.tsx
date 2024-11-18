import { getTotalData } from "@/_utils/serverActions/campApi";
import React from "react";
import CampCard from "../camp/CampCard";

const MainCamps = async () => {
  const camps = await getTotalData(null, 4);

  if (!camps) return <div>캠프 데이터가 없습니다.</div>;
  return (
    <ul className="flex gap-[20px] max-989:flex-wrap">
      {camps.map((camp) => {
        return (
          <li
            className="main_camps flex-1 max-989:w-[calc(50%-10px)] max-989:flex-initial max-450:w-full"
            key={camp.contentId}
          >
            <CampCard camp={camp} type={"main"} />
          </li>
        );
      })}
    </ul>
  );
};

export default MainCamps;
