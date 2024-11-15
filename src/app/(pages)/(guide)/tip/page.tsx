import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import TipCard from "./component/TipCard";
import { TipGuide } from "@/_utils/guide";

const TipPage = () => {
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <GuideTop text={"초보 캠핑 꿀팁"} />
        <div className="tit_box flex flex-col items-center justify-center gap-[40px] text-center">
          <h2 className="color-gray01 text-[30px] font-bold">
            캠핑을 더 즐겁게! 꼭 알아야 할 9가지 꿀팁 🏕️
          </h2>
          <p className="color-gray01 text-[16px]">
            캠핑을 떠나는 설렘은 크지만, 사소한 준비 부족이 즐거운 순간을 망칠
            수도 있습니다. 캠핑 초보자부터 <br />
            베테랑 캠퍼까지 모두가 활용할 수 있는 꿀팁을 준비했습니다. <br />
            자연 속에서의 소중한 시간을 더욱 편안하고 즐겁게 만들어줄 9가지 캠핑
            꿀팁을 만나보세요! 작은 차이가 큰 만족을 만듭니다.
            <br />
            지금 바로 확인하고 완벽한 캠핑 여행을 떠나볼까요?
            <br />
          </p>
        </div>
        <ul className="mt-[100px] flex flex-wrap items-start gap-[60px]">
          {TipGuide.map((guide) => {
            return (
              <li
                key={guide.title}
                className="w-[calc(50%-30px)] rounded-[12px] border border-dashed border-[#a6a6a6] p-[30px] pt-[60px]"
              >
                <TipCard
                  id={guide.id}
                  title={guide.title}
                  desc={guide.desc}
                  img={guide.img}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TipPage;
