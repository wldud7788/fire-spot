"use client";

import DetailMap from "@/app/(pages)/camp-detail/components/DetailMap";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type CampDetailProps = {
  paramsId: string;
};

const fetchTotalData = async () => {
  const response = await fetch("/api/campApi");
  return response.json();
};

const CampDetail = ({ paramsId }: CampDetailProps) => {
  const {
    data: camps,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["camp"],
    queryFn: async () => fetchTotalData(),
    staleTime: 1000 * 60 * 60 * 24
  });

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const camp: Camp | undefined = camps?.find(
    (item: Camp) => item.contentId === paramsId
  );
  const posblFcltyClInfo: string[] | undefined = camp?.posblFcltyCl.split(",");
  const sbrsClInfo: string[] | undefined = camp?.sbrsCl.split(",");

  console.log(camp, sbrsClInfo);

  return (
    <div className="camp_detail">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        {/* 캠핑장 상세 최상단 */}
        <div className="detail_section flex items-center gap-[40px]">
          <div className="left_area w-[calc(100%-500px)] w-full overflow-hidden rounded-[12px]">
            <img src={camp?.firstImageUrl} alt={`${camp?.facltNm} 이미지`} />
          </div>
          <div className="right_area w-full max-w-[460px] rounded-[12px] shadow-custom">
            <div className="info px-[50px] py-[40px]">
              <div className="cont">
                <h1 className="text-[24px] font-bold">{camp?.facltNm}</h1>
                <p className="mb-[20px] mt-[10px]">{camp?.addr1}</p>
                <ul>
                  <li>
                    {/* [이윤지 작업] 윤지님 여기 평점 작업 필요합니다. */}
                  </li>
                  <li>
                    {/* [이윤지 작업] 리뷰 갯수 = 리뷰 ${리뷰 카운트}개  */}
                    <button type="button">리뷰 00개</button>
                  </li>
                </ul>
                <dl>
                  <dt>캠핑장 소개</dt>
                  <dd>
                    <p>{camp?.induty}</p>
                    <p>{camp?.caravInnerFclty}</p>
                    {sbrsClInfo
                      ? sbrsClInfo.map((item, idx) => {
                          return <p key={`${item}-${idx}`}>{item}</p>;
                        })
                      : ""}
                  </dd>
                </dl>
                <dl>
                  <dt>주변 정보</dt>
                  <dd>
                    {posblFcltyClInfo ? (
                      posblFcltyClInfo?.map((item, idx) => (
                        <p key={`${item}-${idx}`}>{item}</p>
                      ))
                    ) : (
                      <p>정보없음</p>
                    )}
                  </dd>
                </dl>
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
          <p>{camp?.featureNm ? camp?.featureNm : camp?.intro}</p>
          <ul>
            <li>{camp?.induty}</li>
            <li>{camp?.caravInnerFclty}</li>
            {sbrsClInfo
              ? sbrsClInfo.map((item, idx) => {
                  return <li key={`${item}-${idx}`}>{item}</li>;
                })
              : ""}
          </ul>
        </div>
        {/*// 캠핑장 소개 */}

        {/* 캠핑장 소개 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">캠핑장 예약하기</h2>
          <ul>
            <li>
              예약 가능한 날:{" "}
              {camp?.operDeCl ? camp?.operDeCl : "정보를 확인할 수 없습니다."}
            </li>
            <li>
              예약 사이트:{" "}
              {camp?.resveUrl ? camp?.resveUrl : "정보를 확인할 수 없습니다."}
            </li>
          </ul>
          <p>자세한 예약 방법은 캠핑장으로 확인해주세요.</p>
        </div>
        {/*// 캠핑장 소개 */}

        {/* 주변 정보 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">주변 정보</h2>
          <ul>
            {posblFcltyClInfo ? (
              posblFcltyClInfo?.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>주변 정보가 없습니다.</li>
            )}
          </ul>
        </div>
        {/*// 주변 정보 */}

        {/* 캠핑장 위치 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area">
            <h2 className="text-[36px] font-bold">캠핑장 위치</h2>
          </div>
          {camp && <DetailMap camp={camp} />}
        </div>
        {/*// 캠핑장 위치 */}

        {/* 캠핑장 날씨를 알려드려요 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area">
            <h2 className="text-[36px] font-bold">캠핑장 날씨를 알려드려요.</h2>
            <span>캠핑장 이때 방문하면 좋아요 : {camp?.operPdCl}</span>
          </div>
        </div>
        {/*// 캠핑장 날씨를 알려드려요 */}

        {/* 캠핑장 리뷰 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area">
            <div className="left_area">
              <h2 className="text-[36px] font-bold">캠핑장 리뷰</h2>
              {/* 이윤지 작업 */}
              <span>33</span>
            </div>
            <div className="right_area">
              <button type="button">리뷰 쓰기</button>
            </div>
          </div>
          {/* 이윤지 작업 - 리뷰 리스트*/}
        </div>
        {/*// 캠핑장 리뷰 */}

        {/* 이 장소와 함께 봤어요 */}
        <div className="detail_section mt-[60px]">
          <h2 className="text-[36px] font-bold">비슷한 캠핑장 추천</h2>
        </div>
        <Link href="/camps">더보기</Link>
        {/*// 이 장소와 함께 봤어요 */}
      </div>
    </div>
  );
};

export default CampDetail;
