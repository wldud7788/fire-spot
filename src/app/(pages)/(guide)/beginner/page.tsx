import React from "react";
import Card from "./component/Card";
import GuideTop from "@/_components/common/GuideTop";

const BeginnerPage = () => {
  const guideData = [
    {
      img: "/assets/images/guide/ico-guide-01.svg",
      title: "기본 장비는 필수!",
      desc: "텐트, 침낭, 매트, 의자, 랜턴 등은 캠핑의 기본 요소입니다. 캠핑 스타일과 인원수에 맞는 장비를 선택하세요! 첫 텐트는 1~2인으로 시작하여 숙련되면 더 큰 텐트를 구매하는 것이 좋습니다. 또한 텐트 설치를 미리 연습해보는 것도 적극 추천드립니다."
    },
    {
      img: "/assets/images/guide/ico-guide-02.svg",
      title: "캠핑 요리는 어떻게 준비해야 하나요?",
      desc: "적절한 조리도구만 있다면 어느 음식이든 가능합니다. 여행 스타일에 맞게 미리 식단을 구성해보세요. 간단한 캠핑을 추구한다면 볶음밥, 샌드위치, 라면류, 여러 명이 함께 캠핑을 할 경우 바베큐, 밀키트 등 다양한 요리를 추천드립니다."
    },
    {
      img: "/assets/images/guide/ico-guide-03.svg",
      title: "캠핑 시 주의해야 할 사항은 무엇인가요?",
      desc: "안전과 환경 보호입니다. 텐트 설치 시 주변 환경을 잘 살펴보고, 텐트 주변에 불을 피우거나 쓰레기를 버리지 않도록 주의해야 합니다. 화기 사용이 필수적인 캠핑이라면 소화기를 비치하는 것이 좋습니다. 또한 겨울 캠핑의 경우 이산화탄소 감지기를 필수로 설치하는 것도 잊지마세요!"
    },
    {
      img: "/assets/images/guide/ico-guide-04.svg",
      title: "캠핑 계획은 어떻게 세워야 하나요?",
      desc: "캠핑 목적, 날짜, 장소, 참여 인원, 예산 등을 고려하여 세우는 것이 좋습니다. 먼저 캠핑을 통해 무엇을 하고 싶은지 목표를 정하고, 그에 맞는 캠핑 장소를 선택하는 것을 추천드립니다!"
    },
    {
      img: "/assets/images/guide/ico-guide-05.svg",
      title: "기본 장비는 필수!",
      desc: "마지막으로 캠핑 초보를 위한 꿀팁은 무엇인가요? 한번에 많은 장비를 사기보다는 필요한 장비부터 하나씩 갖추는 것이 좋습니다. 캠핑 중에는 휴대폰 사용을 줄이고, 자연을 만끽하며 여유로운 시간을 보내보는 것은 어떨까요?"
    }
  ];

  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <GuideTop text={"초보 캠퍼 가이드"} />
        <ul className="flex flex-wrap content-stretch justify-center gap-[50px]">
          {guideData.map((guide) => {
            return (
              <li
                key={guide.title}
                className="w-full max-w-[calc(33.333%-50px)] rounded-[12px] bg-[#FFEFE5] shadow-custom"
              >
                <Card img={guide.img} title={guide.title} desc={guide.desc} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BeginnerPage;
