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

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetDetailController = ({ meetWithCamp }: Props) => {
  const { buttonConfig, hasChatAccess } = useMeetDetailController(meetWithCamp);
  const camp = meetWithCamp.camp as unknown as Camp;
  return (
    <div className="mx-auto mb-[100px] mt-[40px] w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <MeetTitleSection
        meetWithCamp={meetWithCamp}
        buttonConfig={buttonConfig}
        hasChatAccess={hasChatAccess}
      />

      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <div className="mt-[80px]">
        <h2 className="color-gray01 mb-[30px] text-[24px] font-bold">
          모임장소
        </h2>
        <DetailMap camp={camp} />
      </div>
      <div className="mt-[80px]">
        <h2 className="color-gray01 mb-[30px] text-[24px] font-bold">날씨</h2>
        <ForecastWeatherComponent
          latitude={meetWithCamp.camp.mapY}
          longitude={meetWithCamp.camp.mapX}
          campingName={meetWithCamp.camp.facltNm}
        />
      </div>
    </div>
  );
};

export default MeetDetailController;
