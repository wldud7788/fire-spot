import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import { CampfireGuide } from "@/_utils/guide";
import GuideCard from "../component/GuideCard";

const CampfirePage = () => {
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <GuideTop text={"불멍 가이드"} />

        <div className="flex flex-col gap-[50px] rounded-[34px] px-[60px] py-[80px] shadow-custom">
          <h2 className="text-[20px] font-bold">
            캠핑의 꽃인 불멍! 안전하게 즐기는 방법에는 무엇이 있을까요?
          </h2>

          <ul className="flex flex-col gap-[20px]">
            {CampfireGuide.map((guide) => {
              return (
                <li key={guide.title}>
                  <GuideCard title={guide.title} desc={guide.desc} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CampfirePage;