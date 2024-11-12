import React from "react";

const SosCreatorInfoSection = () => {
  return (
    <div className="mt-16 flex w-full flex-col gap-[34px] rounded-[20px] border-[1px] border-[#B5B5B5] bg-[#F6F6F6] pl-[71px] pr-[71px] pt-12 font-pretendard">
      <section className="flex items-center gap-2">
        <h3 className="text-xl font-bold">어떤 카테고리를 선택해야하나요?</h3>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-pin bg-cover bg-center" />
          <h4 className="font-[500]">긴급</h4>
        </div>
        <p className="font-[300]">
          - 위급 상황 발생 시 즉시 신고해주세요.
          <br />
          - 도움이 급히 필요할 때 이 옵션을 선택하세요.
          <br />- 응급상황에 필요한 도움을 요청할 수 있습니
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-pin bg-cover bg-center" />
          <h4 className="font-[500]">캠핑 질문</h4>
        </div>
        <p className="font-[300]">
          - 캠핑과 관련된 모든 질문을 남겨주세요.
          <br />- 장비, 장소 등 캠핑 관련 궁금한 점을 물어보세요.
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">분실/실종</h4>
        </div>
        <p className="mt-[6px] font-[300]">
          - 귀중품을 분실하셨나요? 여기에서 도움을 받으세요.
          <br />- 분실된 물품이나 사람을 찾기 위한 도움을 요청하세요.
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">공공소식</h4>
        </div>
        <p className="mt-[6px] font-[300]">
          공공 안내 사항이나 공지사항이 여기에 게시됩니다.
          <br />
          - 새로운 캠핑장 소식과 공지사항을 확인하세요.
          <br />
          - 커뮤니티에 유용한 공지사항을 확인할 수 있습니다.
          <br />- 공공 안전과 관련된 중요한 정보를 알려드립니다.
        </p>
      </section>
      <section className="flex flex-col justify-center gap-2 text-[15px] text-[#4C4C4C]">
        <div className="flex">
          <div className="h-5 w-5 bg-avatar bg-cover bg-center" />
          <h4 className="font-[500]">도움요청</h4>
        </div>
        <p className="mt-[6px] font-[300]">.</p>
      </section>
    </div>
  );
};

export default SosCreatorInfoSection;
