"use client";
import { MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";
import useMeetDetailController from "../../hooks/useMeetDetailController";
import ForecastWeatherComponent from "@/_components/weather/FutureWeather";
import DetailMap from "@/app/(pages)/camp-detail/components/DetailMap";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import Link from "next/link";

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetDetailController = ({ meetWithCamp }: Props) => {
  const { buttonConfig, hasChatAccess } = useMeetDetailController(meetWithCamp);
  const camp = meetWithCamp.camp as unknown as Camp;
  return (
    <div className="mx-auto mb-[100px] mt-[40px] w-full max-w-[1360px] pl-[30px] pr-[30px] max-989:mt-0 max-989:px-[15px]">
      <MeetTitleSection
        meetWithCamp={meetWithCamp}
        buttonConfig={buttonConfig}
        hasChatAccess={hasChatAccess}
      />

      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <div className="mt-[80px] max-989:mt-[60px]">
        <h2 className="color-gray01 mb-[30px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px] max-767:mb-[20px]">
          모임장소
        </h2>
        <DetailMap camp={camp} />
      </div>
      <div className="mt-[80px] max-989:mt-[60px]">
        <h2 className="color-gray01 mb-[30px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px] max-767:mb-[20px]">
          날씨
        </h2>
        <ForecastWeatherComponent
          latitude={meetWithCamp.camp.mapY}
          longitude={meetWithCamp.camp.mapX}
          campingName={meetWithCamp.camp.facltNm}
        />
        {/* 목록으로 가기 */}
        <div className="detail_section my-[100px] flex justify-center max-767:mb-[60px] max-767:mt-[40px]">
          <Link
            href="/meets"
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

export default MeetDetailController;
