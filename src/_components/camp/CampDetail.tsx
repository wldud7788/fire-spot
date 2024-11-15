"use client";

import DetailMap from "@/app/(pages)/camp-detail/components/DetailMap";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useQuery } from "@tanstack/react-query";
import CampReviewSlide from "./CampReviewSlide";
import ReviewWriteModal from "../modal/ReviewWriteModal";
import Link from "next/link";
import PageTitle from "../common/PageTitle";
import NoData from "../common/NoData";
import ForecastWeatherComponent from "../weather/FutureWeather";
import { upsertCamp } from "@/app/(pages)/meets/actions/meetWriteAction";
import { useState } from "react";
import Modal from "../modal/Modal";
import LikeButton from "../like/LikeButton";
import ShareButton from "./ShareButton";

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

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  // useEffect(() => {

  // }, [camps])

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const camp: Camp | undefined = camps?.find(
    (item: Camp) => item.contentId === paramsId
  );

  // 이윤지 날씨 추가 수정

  const latitude = camp?.mapY || 0;
  const longitude = camp?.mapX || 0;
  const campingName = camp?.facltNm || "알 수 없는 캠핑장";

  const posblFcltyClInfo: string[] | undefined = camp?.posblFcltyCl.split(",");
  const sbrsClInfo: string[] | undefined = camp?.sbrsCl.split(",");

  // 캠핑장 정보가 없을 경우에 대한 처리를 내놓고 아래에서 ? 처리를 뺐습니다. JY
  if (!camp) {
    return <>오류: 캠핑장 정보가 없습니다.</>;
  }

  upsertCamp(camp);

  return (
    <div className="camp_detail mt-[40px] max-989:mt-[0px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        {/* 캠핑장 상세 최상단 */}
        <div className="detail_section flex flex-wrap items-center gap-[20px] max-989:flex-col">
          <div className="left_area w-[calc(100%-500px)] overflow-hidden rounded-[12px] max-1280:w-[calc(100%-440px)] max-1160:w-[calc(100%-380px)] max-989:w-full">
            <img
              src={camp.firstImageUrl}
              alt={`${camp.facltNm} 이미지`}
              className="w-full"
            />
          </div>
          <div className="right_area w-full max-w-[460px] rounded-[12px] shadow-custom max-1280:max-w-[400px] max-1160:max-w-[360px] max-989:max-w-[100%]">
            <div className="info px-[35px] py-[30px] max-1280:p-[30px] max-989:p-[20px]">
              <div className="cont">
                <h1 className="text-[28px] font-bold max-1280:text-[24px] max-1160:text-[22px]">
                  {camp.facltNm}
                </h1>
                <p className="color-gray03 mb-[20px] mt-[5px] text-[14px] max-1280:text-[13px] max-989:text-[12px]">
                  {camp.addr1}
                </p>
                <ul className="flex items-center">
                  <li className="li-before-dot relative mr-[5px] flex items-center gap-[2px] pr-[6px] max-1280:text-[14px] max-989:text-[13px]">
                    {/* [이윤지 작업] 윤지님 여기 평점 작업 필요합니다. */}
                    <img
                      src="/assets/images/common/ico-star-c-big.svg"
                      className="max-1280:relative max-1280:top-[-1px]"
                      alt="평점"
                    />
                    <p>4.9</p>
                  </li>
                  <li className="max-1280:text-[14px] max-989:text-[13px]">
                    {/* [이윤지 작업] 리뷰 갯수 = 리뷰 ${리뷰 카운트}개  */}
                    <button
                      type="button"
                      className="bg-reviewArrow bg-right-center-0 bg-no-repeat pr-[13px]"
                    >
                      리뷰 00개
                    </button>
                  </li>
                </ul>
                <dl className="mt-[30px] max-989:mt-[20px]">
                  <dt className="bg-campChk bg-left-center-0 bg-no-repeat pl-[23px] text-[14px] font-bold">
                    캠핑장 소개
                  </dt>
                  <dd className="mt-[15px] flex flex-wrap gap-[10px]">
                    {camp.induty && (
                      <p className="color-gray03 rounded-[5px] bg-[#f2f2f2] p-[5px] text-[12px]">
                        {camp.induty}
                      </p>
                    )}
                    {camp.caravInnerFclty && (
                      <>
                        {camp.caravInnerFclty?.split(",").map((item) => (
                          <p
                            key={item}
                            className="color-gray03 rounded-[5px] bg-[#f2f2f2] p-[5px] text-[12px]"
                          >
                            {item}
                          </p>
                        ))}
                      </>
                    )}

                    {sbrsClInfo
                      ? sbrsClInfo.map((item, idx) => {
                          return (
                            <p
                              className="color-gray03 rounded-[5px] bg-[#f2f2f2] p-[5px] text-[12px]"
                              key={`${item}-${idx}`}
                            >
                              {item}
                            </p>
                          );
                        })
                      : ""}
                  </dd>
                </dl>
                <dl className="mt-[30px] max-989:mt-[20px]">
                  <dt className="bg-campChk bg-left-center-0 bg-no-repeat pl-[23px] text-[14px] font-bold">
                    주변 정보
                  </dt>
                  <dd className="mt-[15px] flex flex-wrap gap-[10px]">
                    {camp.posblFcltyCl ? (
                      posblFcltyClInfo?.map((item, idx) => (
                        <p
                          className="color-main rounded-[5px] bg-[#FFEFE5] p-[5px] text-[12px]"
                          key={`${item}-${idx}`}
                        >
                          {item}
                        </p>
                      ))
                    ) : (
                      <p className="color-main rounded-[5px] bg-[#FFEFE5] p-[5px] text-[12px]">
                        정보없음
                      </p>
                    )}
                  </dd>
                </dl>
              </div>
              <div className="btn_area mt-[50px] flex items-center gap-[12px]">
                <LikeButton
                  campId={camp.contentId}
                  camp={camp}
                  variant="detailLike"
                />
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
        {/* 캠핑장 상세 최상단*/}

        {/* 캠핑장 소개 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-campTit01 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              캠핑장 소개
            </h2>
          </div>

          {camp.featureNm || camp.intro ? (
            <p className="color-gray01 text-[16px] max-1280:text-[14px]">
              {camp.featureNm ? camp.featureNm : camp.intro}
            </p>
          ) : (
            <div className="mt-[30px] w-full max-w-[450px] rounded-[8px] bg-[#f2f2f2] px-[30px] py-[8px]">
              <p className="color-gray02 bg-import bg-left-center bg-no-repeat pl-[35px] text-[16px]">
                등록된 캠핑장 소개가 없어요.
              </p>
            </div>
          )}

          <ul className="mt-[30px] flex flex-wrap items-center gap-[10px]">
            {camp.induty && (
              <li className="bd-color-main color-gray01 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]">
                {camp.induty}
              </li>
            )}
            {camp.caravInnerFclty && (
              <>
                {camp.caravInnerFclty.split(",").map((item) => (
                  <li
                    key={item}
                    className="bd-color-main color-gray01 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]"
                  >
                    {item}
                  </li>
                ))}
              </>
            )}
            {sbrsClInfo
              ? sbrsClInfo.map((item, idx) => {
                  return (
                    <li
                      className="bd-color-main color-gray01 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]"
                      key={`${item}-${idx}`}
                    >
                      {item}
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
        {/*// 캠핑장 소개 */}

        {/* 캠핑장 예약하기 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-campTit02 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              캠핑장 예약하기
            </h2>
          </div>
          <ul>
            <li className="color-gray01 bg-polygon bg-left-center-0 bg-no-repeat pl-[23px] text-[16px]">
              예약 가능한 날:{" "}
              {camp.operDeCl ? camp.operDeCl : "정보를 확인할 수 없습니다."}
            </li>
            <li className="color-gray01 bg-polygon bg-left-center-0 bg-no-repeat pl-[23px] text-[16px]">
              예약 사이트:{" "}
              {camp.resveUrl ? camp.resveUrl : "정보를 확인할 수 없습니다."}
            </li>
          </ul>
          <div className="mt-[30px] w-full max-w-[400px] rounded-[8px] bg-[#f2f2f2] px-[30px] py-[8px] max-767:max-w-[100%] max-767:px-[0px]">
            <p className="color-gray02 bg-import bg-left-center bg-no-repeat pl-[35px] text-[16px] max-767:text-[14px]">
              자세한 예약 방법은 캠핑장으로 확인해주세요.
            </p>
          </div>
        </div>
        {/*// 캠핑장 예약하기 */}

        {/* 주변 정보 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-campTit03 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              주변 정보
            </h2>
          </div>

          {camp.posblFcltyCl ? (
            <ul className="mt-[30px] flex flex-wrap items-center gap-[10px]">
              {posblFcltyClInfo?.map((item) => (
                <li
                  className="bd-color-main color-gray01 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-[30px] w-full max-w-[400px] rounded-[8px] bg-[#f2f2f2] px-[30px] py-[8px]">
              <p className="color-gray02 bg-import bg-left-center bg-no-repeat pl-[35px] text-[16px]">
                등록된 주변 정보가 없어요.
              </p>
            </div>
          )}
        </div>
        {/*// 주변 정보 */}

        {/* 캠핑장 위치 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-campTit04 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              캠핑장 위치
            </h2>
            <p className="mt-[15px] bg-direction bg-left-center-0 bg-no-repeat pl-[30px] text-base">
              {camp.direction}
            </p>
          </div>
          <DetailMap camp={camp} />
        </div>
        {/*// 캠핑장 위치 */}

        {/* 캠핑장 날씨를 알려드려요 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px] flex items-center gap-[14px] max-767:flex-col max-767:items-start max-767:gap-[15px]">
            <h2 className="bg-campTit05 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px] max-767:w-full">
              캠핑장 날씨를 알려드려요.
            </h2>
            {/* 캠핑장 날씨 최신 수정 */}
            <p className="color-gray03 rounded-[8px] border border-[#D9D9D9] bg-[#f2f2f2] p-[10px] text-[16px] max-1280:text-[14px]">
              캠핑장 이때 방문하면 좋아요 : {camp.operPdCl}
            </p>
          </div>
          <ForecastWeatherComponent
            latitude={latitude}
            longitude={longitude}
            campingName={campingName}
          />
        </div>
        {/*// 캠핑장 날씨를 알려드려요 */}

        {/* 캠핑장 리뷰  캠프 리뷰 슬라이드 */}
        {/* TODO: 이윤지
pr 먼저~
          1. 리뷰 정책 추가하기 
          2. 캠핑장 리뷰 쓰는 부분 모달열기전에는 보이지 않게 수정하기
          3. PR 올려서 머지하기

          ------ PR 이후 다시 작업
          
          1. 해당 캠핑장의 리뷰 총 개수 가져와서 뿌려주기
          2. 해당 리뷰둘의 평균값을 가져와서 뿌려주기


          3. 모달 슬라이드쪽이랑 z-index 겹치는 부분 수정하기 (민규님이 해주실수도? 행복회로)
         */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px] flex items-center justify-between">
            <div className="left_area flex items-center gap-[15px] max-767:flex-col max-767:items-start">
              <h2 className="bg-campTit06 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
                캠핑장 리뷰
              </h2>
              {/* 이윤지 작업 */}
              <ul className="flex items-center">
                <li className="li-before-dot color-main relative mr-[10px] flex items-center pr-[10px] text-[20px] font-bold max-1280:text-[16px]">
                  {/* [이윤지 작업] 윤지님 여기 평점 작업 필요합니다. */}
                  33
                </li>
                <li className="relative mr-[5px] flex items-center gap-[2px] pr-[6px] max-1280:text-[16px]">
                  {/* [이윤지 작업] 윤지님 여기 평점 작업 필요합니다. */}
                  <img
                    src="/assets/images/common/ico-star-c-big.svg"
                    alt="평점"
                  />
                  <p>4.9</p>
                </li>
              </ul>
            </div>
            <div className="right_area">
              <button
                type="button"
                className="color-main bd-color-main rounded-[8px] border p-[10px] text-[18px] max-1280:py-[5px] max-1280:text-[16px]"
                onClick={handleModalOpen}
              >
                리뷰 쓰기
              </button>
            </div>

            <Modal
              modalType={""} // 모달 타입
              width={"500"} // 컨텐츠 넓이
              isOpen={isOpen}
              onClose={handleModalClose}
            >
              <ReviewWriteModal
                campId={camp.contentId}
                onClose={handleModalClose}
              />
            </Modal>
          </div>
          {/* 이윤지 작업 - 리뷰 리스트*/}
          {true ? (
            <>
              {/* <ReviewWriteModal campId={paramsId} onClose={() => {}} /> */}
              <CampReviewSlide campId={paramsId} />
            </>
          ) : (
            <NoData text={"등록된 리뷰가 없어요."} />
          )}
        </div>
        {/*// 캠핑장 리뷰 */}

        {/* 이 장소와 함께 봤어요 */}
        <div className="detail_section mb-[30px] mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-campTit07 bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              비슷한 캠핑장 추천
            </h2>
          </div>
          {false ? (
            "데이터 넣어주세요. false에 데이터 있는지 없는지 처리, 현재는 노데이터 스타일하려고 false로 임의로해놓았습니다."
          ) : (
            <NoData text={"추천 캠핑장이 없어요."} />
          )}
        </div>
        {/*// 이 장소와 함께 봤어요 */}

        {/* 목록으로 가기 */}
        <div className="detail_section my-[100px] flex justify-center max-767:mb-[60px] max-767:mt-[40px]">
          <Link
            href="/camps"
            className="color-main bg-sub block w-full max-w-[300px] rounded-[12px] border border-[#ff924c] bg-[#fff] py-[20px] text-center font-bold max-767:max-w-[100%] max-767:py-[15px]"
          >
            목록으로 이동
          </Link>
        </div>
        {/*// 목록으로 가기 */}
      </div>
    </div>
  );
};

export default CampDetail;
