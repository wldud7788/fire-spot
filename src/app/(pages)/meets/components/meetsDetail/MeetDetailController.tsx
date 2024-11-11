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
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <MeetTitleSection
        meetWithCamp={meetWithCamp}
        buttonConfig={buttonConfig}
        hasChatAccess={hasChatAccess}
      />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <DetailMap camp={camp} />
      <ForecastWeatherComponent
        latitude={meetWithCamp.camp.mapY}
        longitude={meetWithCamp.camp.mapX}
        campingName={meetWithCamp.camp.facltNm}
      />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetDetailController;
