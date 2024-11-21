import React from "react";

const CampDetailSkeleton = () => {
  return (
    <div className="camp_detail mt-[40px] max-989:mt-[0px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        {/* 캠핑장 상세 최상단 */}
        <div className="detail_section flex flex-wrap items-center gap-[20px] max-989:flex-col">
          <div className="left_area bg-sk01 color-hide min-h-[500px] w-[calc(100%-500px)] overflow-hidden rounded-[12px] max-1280:min-h-[450px] max-1280:w-[calc(100%-440px)] max-1160:w-[calc(100%-380px)] max-989:w-full">
            text
          </div>
          <div className="right_area w-full max-w-[460px] rounded-[12px] shadow-custom max-1280:max-w-[400px] max-1160:max-w-[360px] max-989:max-w-[100%]">
            <div className="info px-[35px] py-[30px] max-1280:p-[30px] max-989:p-[20px]">
              <div className="cont">
                <h1 className="bg-sk01 color-hide text-[28px] font-bold max-1280:text-[24px] max-1160:text-[22px]">
                  text
                </h1>
                <p className="color-hide bg-sk02 mb-[20px] mt-[5px] text-[14px] max-1280:text-[13px] max-989:text-[12px]">
                  text
                </p>
                <ul className="flex items-center">
                  <li className="li-before-dot color-hide bg-sk02 relative mr-[5px] flex items-center gap-[2px] pr-[6px] max-1280:text-[14px] max-989:text-[13px]">
                    text
                  </li>
                  <li className="max-1280:text-[14px] max-989:text-[13px]">
                    {/* [이윤지 작업] 리뷰 갯수 = 리뷰 ${리뷰 카운트}개  */}
                    <button
                      type="button"
                      className="bg-sk02 color-hide bg-right-center-0 bg-no-repeat pr-[13px]"
                    >
                      text
                    </button>
                  </li>
                </ul>
                <dl className="mt-[30px] max-989:mt-[20px]">
                  <dt className="bg-sk01 color-hide bg-left-center-0 bg-no-repeat pl-[23px] text-[14px] font-bold">
                    캠핑장 소개
                  </dt>
                  <dd className="mt-[15px] flex flex-wrap gap-[10px]">
                    <p className="color-hide bg-sk02 rounded-[5px] p-[5px] text-[12px]">
                      text
                    </p>
                    <p className="color-hide bg-sk02 rounded-[5px] p-[5px] text-[12px]">
                      text
                    </p>
                    <p className="color-hide bg-sk02 rounded-[5px] p-[5px] text-[12px]">
                      text
                    </p>
                    <p className="color-hide bg-sk02 rounded-[5px] p-[5px] text-[12px]">
                      text
                    </p>
                    <p className="color-hide bg-sk02 rounded-[5px] p-[5px] text-[12px]">
                      text
                    </p>
                  </dd>
                </dl>
                <dl className="mt-[30px] max-989:mt-[20px]">
                  <dt className="bg-sk01 color-hide bg-left-center-0 bg-no-repeat pl-[23px] text-[14px] font-bold">
                    주변 정보
                  </dt>
                  <dd className="mt-[15px] flex flex-wrap gap-[10px]">
                    <p className="color-hide bg-ske02 rounded-[5px] p-[5px] text-[12px]">
                      정보없음
                    </p>
                  </dd>
                </dl>
              </div>
              <div className="btn_area mt-[50px] flex items-center gap-[12px]">
                <div className="bg-sk02 color-hide flex h-[60px] flex-1 items-center justify-center gap-[12px] rounded-[12px] border text-[18px] max-1280:h-[50px] max-1280:text-[16px]">
                  text
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 캠핑장 상세 최상단*/}

        {/* 캠핑장 소개 */}
        <div className="detail_section mt-[60px]">
          <div className="tit_area mb-[30px]">
            <h2 className="bg-sk01 color-hide bg-left-center-0 bg-no-repeat pl-[34px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
              캠핑장 소개
            </h2>
          </div>

          <p className="color-hide bg-sk02 min-h-[50px] text-[16px] max-1280:text-[14px]">
            text
          </p>

          <ul className="mt-[30px] flex flex-wrap items-center gap-[10px]">
            <li className="color-hide bg-sk02 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]">
              text
            </li>
            <li className="color-hide bg-sk02 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]">
              text
            </li>
            <li className="color-hide bg-sk02 rounded-[20px] border px-[18px] py-[10px] text-[18px] max-1280:px-[15px] max-1280:py-[7px] max-1280:text-[16px] max-989:px-[12px] max-989:py-[5px] max-989:text-[14px]">
              text
            </li>
          </ul>
        </div>
        {/*// 캠핑장 소개 */}
      </div>
    </div>
  );
};

export default CampDetailSkeleton;
