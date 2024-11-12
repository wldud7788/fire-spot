import WriteButton from "@/_components/common/WriteButton";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import React from "react";
import { SosWithCamp } from "./types/sos.types";
import { getSosList } from "./service/sosSerivce";
import SosCard from "./components/sos/SosCard";
import { Metadata } from "next";
import CommunityTop from "@/_components/common/CommunityTop";
import NoData from "@/_components/common/NoData";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟 SOS",
    description: "불멍스팟 SOS 목록 페이지"
  };
}

const SosList = async () => {
  const sosWithCampList: SosWithCamp[] = await getSosList();

  return (
    <div className="relative mx-auto w-full max-w-[1360px] px-[30px]">
      <CommunityTop text={"SOS 도움요청"} />
      <div className="utils flex items-center justify-between">
        <div className="flex items-center gap-[14px]">
          <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold">
            진행중
          </button>
          <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold">
            종료됨
          </button>
        </div>
        <div>
          <WriteButton url={SERVER_PAGE_URL.sosWrite}>
            도움 요청하기
          </WriteButton>
        </div>
      </div>

      {sosWithCampList ? (
        <ul className="mt-[40px] flex flex-col items-center gap-[23px]">
          {sosWithCampList.map((sosWithCamp) => (
            <li key={sosWithCamp.sos.id} className="w-full">
              <SosCard sosWithCamp={sosWithCamp} />
            </li>
          ))}
        </ul>
      ) : (
        <NoData text={"등록된 모임이 없어요."} />
      )}
      <div className="my-[65px]">{"페이지네이션"}</div>
    </div>
  );
};

export default SosList;
