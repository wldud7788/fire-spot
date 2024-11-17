import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import { EtiquetteGuide } from "@/_utils/guide";
import EtiquetteCard from "./component/EtiquetteCard";

const Etiquette = () => {
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <GuideTop text={"에티켓 가이드"} />
        <ul className="flex flex-col gap-[50px] max-1280:gap-[20px]">
          {EtiquetteGuide.map((guide) => {
            return (
              <li
                key={guide.title}
                className="rounded-[12px] border border-[#BFBFBF] px-[55px] py-[35px] shadow-custom max-1280:p-[30px] max-767:px-[20px]"
              >
                <EtiquetteCard title={guide.title} desc={guide.desc} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Etiquette;
