import React from "react";

const MeetCreatorInfoSection = () => {
  return (
    <div className="mt-16 flex h-[592px] w-full flex-col gap-[34px] rounded-[20px] border-[1px] border-[#B5B5B5] bg-[#F6F6F6] pl-[71px] pr-[71px] pt-12 font-pretendard">
      <section className="flex items-center gap-2">
        <div className="h-6 w-6 bg-infoRound bg-cover bg-center" />
        <h3 className="text-xl font-bold">모임 작성 예시를 알려드려요</h3>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">모임장을 소개해주세요.</h4>
        </div>
        <p className="leading-normal; font-[300]">
          자세한 소개일 수록 더 잘맞는 사람을 만나실 수 있을거에요.
        </p>
        <p className="font-[300]">
          {"예시) 안녕하세요 저는 캠핑 5년차입니다. 불멍과 요리를 좋아해요."}
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">이런 활동을 할거에요.</h4>
        </div>
        <p className="font-[300]">
          {`처음 모임에 오시는 분들을 위해 자세한 활동 내용을 적어주세요.`}
          <br />
          {`
          예시)
          - 다 같이 모여서 텐트를 설치합니다. 초보자이신 분들도 텐트설치 방법을 알려드릴 예정이니 편하게 와주세요.
          - 다 같이 모여서 음식을 만들어 먹는 시간을 보낼거에요.
          - 저녁엔 캠프파이어를 하며 이야기를 나눠봐요. 그냥 불멍하셔도 좋습니다.
          `}
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">이런 멤버와 함께이면 좋겠어요.</h4>
        </div>
        <p className="mt-[6px] font-[300]">
          취향과 캠핑 스타일이 맞는 사람을 찾기 위해서 우리 모임의 스타일을
          알려주시면 좋겠죠.
        </p>
        <p className="mt-[6px] font-[300]">
          {
            "예시) 풍경 좋아하고 불멍 좋아하시는 분들, 대화하기 좋아하시는 분들과 함께 하고 싶어요."
          }
        </p>
      </section>
    </div>
  );
};

export default MeetCreatorInfoSection;
