"use client";

import { getTotalData } from "@/_utils/serverActions/campApi";
import { useQuery } from "@tanstack/react-query";

type CampDetailProps = {
  paramsId: string;
};

const CampDetail = ({ paramsId }: CampDetailProps) => {
  const {
    data: camps,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["camp"],
    queryFn: async () => getTotalData(),
    refetchOnMount: true // 마운트 시 재요청
  });

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const camp = camps?.find((item) => item.contentId === paramsId);
  const nearbyInfo: string[] | undefined = camp?.posblFcltyCl.split(",");

  console.log(camp);

  return (
    <div className="camp_detail">
      <div className="inner">
        {/* 캠핑장 상세 최상단 */}
        <div className="detail_section">
          <div className="left_area">슬라이드 영역</div>
          <div className="right_area">
            <div className="info">
              <div className="cont">
                <h1>{camp?.facltNm}</h1>
                <p>{camp?.addr1}</p>
                <p>
                  <span>20.5℃ 맑음</span>
                  <span>249Km</span>
                </p>
                <ul>
                  <li>#파쇄석 바닥</li>
                  <li>#사진 맛집</li>
                  <li>#프라이빗</li>
                  <li>#야경이 예쁜</li>
                  <li>#반려견 동반</li>
                </ul>
              </div>
              <div className="btn_area">
                <button>스크랩</button>
                <button>공유하기</button>
              </div>
            </div>
          </div>
        </div>
        {/* 캠핑장 상세 최상단*/}

        {/* 캠핑장 소개 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">캠핑장 소개</h2>
          {/* <p>{camp.featureNm ? camp.featureNm : camp.intro}</p> */}
        </div>
        {/*// 캠핑장 소개 */}

        {/* 주변 정보 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">주변 정보</h2>
          <ul>
            {nearbyInfo?.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
        {/*// 주변 정보 */}

        {/* 캠핑장 위치 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">캠핑장 위치</h2>
        </div>
        {/*// 캠핑장 위치 */}

        {/* 캠핑장 날씨를 알려드려요 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">캠핑장 날씨를 알려드려요</h2>
        </div>
        {/*// 캠핑장 날씨를 알려드려요 */}

        {/* 캠핑장 리뷰 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">캠핑장 리뷰</h2>
        </div>
        {/*// 캠핑장 리뷰 */}

        {/* 댓글 쓰기 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">댓글 쓰기</h2>
        </div>
        {/*// 댓글 쓰기 */}

        {/* 이 장소와 함께 봤어요 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">이 장소와 함께 봤어요</h2>
        </div>
        {/*// 이 장소와 함께 봤어요 */}
      </div>
    </div>
  );
};

export default CampDetail;
