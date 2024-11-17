"use client";

import React from "react";
import { SosWithCamp } from "../../types/sos.types";
import CommunityTop from "@/_components/common/CommunityTop";
import WriteButton from "@/_components/common/WriteButton";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import SosCard from "./SosCard";
import NoData from "@/_components/common/NoData";
import useSosList from "../../hooks/useSosList";
import usePagination from "@/_components/pagination/hooks/pagination";
import Pagination from "@/_components/pagination/Pagination";

type Props = {
  sosWithCampList: SosWithCamp[];
  itemsPerPage: number;
};

const SosList = ({ sosWithCampList, itemsPerPage }: Props) => {
  const { isProgress, toggleShowType, sosWithCampCardList } =
    useSosList(sosWithCampList);

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: sosWithCampCardList || [], itemsPerPage });

  return (
    <div className="relative mx-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
      <CommunityTop text={"SOS 도움요청"} />
      <div className="utils flex items-center justify-between">
        <div className="flex items-center gap-[14px] max-1280:gap-[8px]">
          <button
            className={`rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold max-1280:px-[12px] max-1280:py-[6px] max-767:text-[12px] ${isProgress ? "border-[#ff924c]" : ""}`}
            onClick={() => toggleShowType(true)}
          >
            진행중
          </button>
          <button
            className={`rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold max-1280:px-[12px] max-1280:py-[6px] max-767:text-[12px] ${!isProgress ? "border-[#ff924c]" : ""}`}
            onClick={() => toggleShowType(false)}
          >
            종료됨
          </button>
        </div>
        <div>
          <WriteButton url={SERVER_PAGE_URL.sosWrite}>
            도움 요청하기
          </WriteButton>
        </div>
      </div>

      {sosWithCampCardList.length ? (
        <ul className="mt-[40px] flex flex-col items-center gap-[23px] max-767:mt-[20px] max-767:gap-[15px]">
          {sosWithCampCardList.map((sosWithCamp) => (
            <li key={sosWithCamp.sos.id} className="w-full">
              <SosCard sosWithCamp={sosWithCamp} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-[20px]">
          <NoData text={"등록된 모임이 없어요."} />
        </div>
      )}
      <div className="my-[65px]">
        <Pagination
          page={page}
          totalPages={totalPages}
          onMovePagePrev={movePagePrev}
          onMovePageNext={movePageNext}
        />
      </div>
    </div>
  );
};

export default SosList;
