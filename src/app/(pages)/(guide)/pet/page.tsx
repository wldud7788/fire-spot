import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import { PetGuide } from "@/_utils/guide";
import GuideCard from "../component/GuideCard";

const PetPage = () => {
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <GuideTop text={"반려동물 가이드"} />

        <div className="flex flex-col gap-[50px] rounded-[34px] px-[60px] py-[80px] shadow-custom max-1280:px-[30px] max-1280:py-[40px]">
          <h2 className="text-[20px] font-bold max-1280:text-[18px] max-767:text-[16px]">
            페티켓 캠핑
          </h2>
          <img src="/assets/images/guide/pet.jpg" alt="pet" />
          <div className="text_box">
            <strong className="color-main text-[16px] font-bold">
              ‘페티켓’이라는 단어를 아시나요?
            </strong>
            <p className="color-gray01 text-[16px] max-767:text-[14px]">
              펫과 에티켓의 합성어로 반려동물을 키울 때 지켜야 할 여러 가지
              예절을 의미합니다.
            </p>
          </div>

          <ul className="flex flex-col gap-[20px]">
            {PetGuide.map((guide) => {
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

export default PetPage;
