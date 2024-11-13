import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import Card from "../component/Card";

const PetPage = () => {
  const guideData = [
    {
      title: "첫 번째 페티켓: 반려동물 동반 가능 여부를 반드시 확인해주세요.",
      desc: "캠핑장이 야외라고 해서 모든 캠핑장이 반려동물과 함께 입장할 수 있는 것은 아닙니다. 각 캠핑장마다 반려동물 정책이 다르기 때문에, 미리 홈페이지나 전화로 확인하는 것이 좋습니다. 또한, 반려동물과 함께 입장할 수 있는 구역과 제한 사항도 꼼꼼히 체크해 안전하고 즐거운 캠핑을 준비하세요! 반려동물 동반 입장이 가능한 캠핑장이라 하더라도, 주인이 통제하지 못한다면 출입을 자제하는 것이 좋습니다. 반려동물이 이웃 캠퍼에게 위협이되지 않도록 항상 주의해 주세요."
    },
    {
      title: "두 번째 페티켓: 반려동물의 배변 마무리는 깔끔하게 청소해 주세요.",
      desc: "배변 후에는 반드시 깔끔하게 치우고, 이를 위한 배변 봉투를 항상 챙기는 것이 좋습니다. 다음 이용객을 위해 깨끗한 캠핑장 사용 부탁드려요."
    },
    {
      title: "세 번째 페티켓: 리드줄은 항상 착용해 주세요!",
      desc: "타인의 안전을 지키기 위해서뿐만 아니라, 내 반려동물의 안전을 위해서도 반드시 필요합니다. 리드줄을 사용하면 반려동물이 예상치 못한 상황에서 도망치거나 다른 사람과의 충돌을 피할 수 있습니다. 특히, 낯선 환경에서는 리드줄이 반려동물의 행동을 더 잘 통제할 수 있게 도와주므로, 안전하고 즐거운 캠핑을 위해 항상 착용시켜 주세요!"
    },
    {
      title: "네 번째 페티켓: 이웃 캠퍼와 소통하는 것도 중요합니다.",
      desc: "반려동물과의 상호작용을 원치 않는 사람도 있을 수 있으니, 항상 이웃 캠퍼들의 의사를 존중해야 합니다. 캠핑장에서는 서로 다른 사람들의 취향과 편안함을 고려하는 것이 필수적입니다. 만약 누군가가 반려동물에게 다가오는 것을 원하지 않는다면, 그 의사를 존중하고 반려동물과의 거리를 유지하는 것이 좋아요. 이러한 작은 배려가 반려동물과 함께하는 경험을 더욱 즐겁고 안전하게 만들어줄 것입니다. 모두가 함께하는 공간에서 서로를 존중하며 행복한 시간을 보내길 바랍니다."
    }
  ];
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <GuideTop text={"반려동물 가이드"} />

        <div className="flex flex-col gap-[50px] rounded-[34px] px-[60px] py-[80px] shadow-custom">
          <h2 className="text-[20px] font-bold">펫티켓 캠핑</h2>

          <div className="text_box">
            <strong className="color-main text-[16px] font-bold">
              ‘페티켓’이라는 단어를 아시나요?
            </strong>
            <p className="color-gray01 text-[16px]">
              펫과 에티켓의 합성어로 반려동물을 키울 때 지켜야 할 여러 가지
              예절을 의미합니다.
            </p>
          </div>

          <ul className="flex flex-col gap-[20px]">
            {guideData.map((guide) => {
              return (
                <li key={guide.title}>
                  <Card title={guide.title} desc={guide.desc} />
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
