import React from "react";

const MeetCreatorInfoSection = () => {
  return (
    <div className="rounded-120px] mt-[40px] flex w-full flex-col rounded-[12px] border border-[#D9D9D9] bg-[#F6F6F6] px-[30px] py-[40px]">
      <h2 className="color-gray01 mb-[20px] text-[20px] font-bold">
        모임 작성 예시를 알려드려요
      </h2>

      <div className="tbox mt-[22px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          모임장을 소개해주세요.
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <strong className="color-gray01 font-medium">
            자세한 소개일 수록 더 잘맞는 사람을 만나실 수 있을거에요.
          </strong>
          <p className="color-gray01 text-[16px]">
            {"예시) 안녕하세요 저는 캠핑 5년차입니다. 불멍과 요리를 좋아해요."}
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          이런 활동을 할거에요.
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <strong className="color-gray01 font-medium">{`처음 모임에 오시는 분들을 위해 자세한 활동 내용을 적어주세요.`}</strong>
          <p className="color-gray01 text-[16px]">
            예시)
            <br />
            - 다 같이 모여서 텐트를 설치합니다. 초보자이신 분들도 텐트설치
            방법을 알려드릴 예정이니 편하게 와주세요.
            <br />
            - 다 같이 모여서 음식을 만들어 먹는 시간을 보낼거에요.
            <br />
            - 저녁엔 캠프파이어를 하며 이야기를 나눠봐요. 그냥 불멍하셔도
            좋습니다.
            <br />
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          이런 멤버와 함께이면 좋겠어요.
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <strong className="color-gray01 font-medium">
            취향과 캠핑 스타일이 맞는 사람을 찾기 위해서 우리 모임의 스타일을
            알려주시면 좋겠죠.
          </strong>
          <p className="color-gray01 text-[16px]">
            {
              "예시) 풍경 좋아하고 불멍 좋아하시는 분들, 대화하기 좋아하시는 분들과 함께 하고 싶어요."
            }
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          공지사항, 준비물 등 모임에 필요한걸 알려주세요.
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <strong className="color-gray01 text-[16px] font-medium">
            우리 모임에 필요한 준비물이나 사전에 알아야할 내용이 있다면
            적어주세요.
          </strong>
          <p className="color-gray01 text-[16px]">
            {"예시) 안녕하세요 저는 캠핑 5년차입니다. 불멍과 요리를 좋아해요."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetCreatorInfoSection;
