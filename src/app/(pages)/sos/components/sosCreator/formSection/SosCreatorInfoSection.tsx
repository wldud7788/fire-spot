import React from "react";

const SosCreatorInfoSection = () => {
  return (
    <div className="mt-[40px] flex w-full flex-col rounded-[12px] border border-[#D9D9D9] bg-[#F6F6F6] px-[30px] py-[40px]">
      <h2 className="color-gray01 mb-[20px] text-[20px] font-bold">
        어떤 카테고리를 선택해야하나요?
      </h2>

      <div className="tbox mt-[22px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          긴급
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <p className="color-gray01 text-[16px]">
            - 위급 상황 발생 시 즉시 신고해주세요.
            <br />
            - 도움이 급히 필요할 때 이 옵션을 선택하세요.
            <br />- 응급상황에 필요한 도움을 요청할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          캠핑 질문
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <p className="color-gray01 text-[16px]">
            - 캠핑과 관련된 모든 질문을 남겨주세요.
            <br />- 장비, 장소 등 캠핑 관련 궁금한 점을 물어보세요.
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          분실/실종
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <p className="color-gray01 text-[16px]">
            - 귀중품을 분실하셨나요? 여기에서 도움을 받으세요.
            <br />- 분실된 물품이나 사람을 찾기 위한 도움을 요청하세요.
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          공공소식
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <p className="color-gray01 text-[16px]">
            - 공공 안내 사항이나 공지사항이 여기에 게시됩니다.
            <br />
            - 새로운 캠핑장 소식과 공지사항을 확인하세요.
            <br />
            - 커뮤니티에 유용한 공지사항을 확인할 수 있습니다.
            <br />- 공공 안전과 관련된 중요한 정보를 알려드립니다.
          </p>
        </div>
      </div>

      <div className="text_area mt-[35px]">
        <h3 className="bg-center-left color-gray01 bg-pin bg-no-repeat pl-[20px] text-[18px] font-medium">
          도움요청
        </h3>
        <div className="text_box mt-[12px] pl-[20px]">
          <p className="color-gray01 text-[16px]">-</p>
        </div>
      </div>
    </div>
  );
};

export default SosCreatorInfoSection;
