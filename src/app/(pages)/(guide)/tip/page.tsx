import GuideTop from "@/_components/common/GuideTop";
import React from "react";
import TipCard from "./component/TipCard";

const TipPage = () => {
  const guideData = [
    {
      id: 1,
      img: "/assets/images/guide/ico-guide-tip-01.svg",
      title: "날씨",
      desc: "좋은 날씨에 주로 캠핑을 가지만, 날씨가 나빠졌을 때를 대비해야 합니다. 따뜻한 모자나 체온을 올릴 수 있는 난방기구, 비가 올 때를 대비한 방수가 되는 옷을 준비하는 것이 좋습니다. 무엇보다 일기예보를 잘 확인하도록 합니다."
    },
    {
      id: 2,
      img: "/assets/images/guide/ico-guide-tip-02.svg",
      title: "첫 캠핑은 집에서 가까운 곳으로",
      desc: "첫 캠핑에서는 무언가를 잊거나, 예상치 못한 날씨를 겪거나, 일찍 집으로 돌아가고 싶어질 가능성도 있습니다. 집에서 멀지 않은 곳에 있는 캠핑장을 선택하면, 필요한 것을 다시 가지러 갈 수 있고 상황에 맞게 빨리 돌아올 수 있어 편리합니다."
    },
    {
      id: 3,
      img: "/assets/images/guide/ico-guide-tip-03.svg",
      title: "구급상자",
      desc: "어떤 상황이 생길지 모르니, 상처를 소독하거나 붕대를 감거나 필요한 약품이 무엇이 있는지 알아보고 구비하는 것이 좋습니다."
    },
    {
      id: 4,
      img: "/assets/images/guide/ico-guide-tip-04.svg",
      title: "나무 밑은 조심",
      desc: "나무 밑에 캠핑을 하면 그늘이 있어서 좋지만, 바람이 많이 부는 날에는 나뭇가지가 떨어져 사고가 날 수 있습니다. 또 나무의 수액이 떨어져 텐트에 묻으면 치우기 힘드니, 되도록 나무 밑은 피하는 것이 좋습니다."
    },
    {
      id: 5,
      img: "/assets/images/guide/ico-guide-tip-05.svg",
      title: "그늘막 타프",
      desc: "초보 캠핑러들은 설치하기 쉬운 타프를 준비하는 것이 좋습니다."
    },
    {
      id: 6,
      img: "/assets/images/guide/ico-guide-tip-06.svg",
      title: "캠핑 테이블과 의자",
      desc: "이동이 편리하도록 가벼우며, 접이식으로 사용할 수 있는 것이 좋습니다."
    },
    {
      id: 7,
      img: "/assets/images/guide/ico-guide-tip-07.svg",
      title: "잠자리",
      desc: "밤새 바닥에서 올라오는 냉기와 습기를 막아줄 수 있도록 돗자리를 깔아주고, 침낭이나 에어매트리스를 사용해 푹신하게 해주면 좋습니다. 여름이라도 일교차가 크기 때문에, 옷과 담요를 챙기는 게 좋습니다."
    },
    {
      id: 8,
      img: "/assets/images/guide/ico-guide-tip-08.svg",
      title: "바비큐",
      desc: "초보 캠핑러가 무엇을 준비해야 할지 어려워할 수 있는데, 바비큐 세트를 구입하면 필요한 음식들이 모두 들어있어 편리합니다. 이후에 추가로 필요한 것을 구매하면 좋습니다."
    },
    {
      id: 9,
      img: "/assets/images/guide/ico-guide-tip-09.svg",
      title: "캠핑 사전 조사",
      desc: "방문하는 곳이 안전 시설을 잘 갖추고 있는지 확인해야 하므로 “불멍스팟”에서 정보를 확인하는 것이 좋습니다."
    },
    {
      id: 10,
      img: "/assets/images/guide/ico-guide-tip-10.svg",
      title: "야생동물 및 화재 위험",
      desc: "캠핑장에 새나 다람쥐 같은 야생동물이 있을 수 있으니 음식물 관리에 주의하고, 캠핑장 내 소화기 위치를 미리 알아두면 화재 예방에 도움이 됩니다."
    },
    {
      id: 11,
      img: "/assets/images/guide/ico-guide-tip-11.svg",
      title: "준비물",
      desc: "준비물이 너무 많다고 필요한 것만 챙기기보다, 어떤 상황이 생길지 모르니 준비물은 많이 챙길수록 좋습니다. 초보 캠핑러라면, 아직 캠핑이 성향에 맞는지 모르기에 처음부터 물품을 전부 새로 구입하기보다 중고 물품을 구매하거나, 빌리는 것이 좋습니다. 캠핑장에 많은 사람이 있거나 주변 소음이 있어서 편하게 잠을 자기 어려울 수 있으니, “귀마개”를 챙기는 것도 좋습니다."
    }
  ];
  return (
    <div className="my-[40px] mb-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
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
          {guideData.map((guide) => {
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
