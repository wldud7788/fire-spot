import WriteButton from "@/_components/common/WriteButton";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import React from "react";
import { SosWithCamp } from "./types/sos.types";
import { getSosList } from "./service/sosSerivce";
import SosCard from "./components/sos/SosCard";
import { Metadata } from "next";

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
      <div className="absolute right-[30px] top-4 h-[40px]">
        <WriteButton url={SERVER_PAGE_URL.sosWrite}>작성으로 가자</WriteButton>
      </div>
      <ul className="mt-[40px] flex flex-col items-center gap-[23px]">
        {sosWithCampList.map((sosWithCamp) => (
          <li key={sosWithCamp.sos.id} className="w-full">
            <SosCard sosWithCamp={sosWithCamp} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SosList;
