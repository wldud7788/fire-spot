"use client";
import { MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";
import useMeetDetailController from "../../hooks/useMeetDetailController";
import ForecastWeatherComponent from "@/_components/weather/FutureWeather";

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetDetailController = ({ meetWithCamp }: Props) => {
  const { buttonConfig } = useMeetDetailController(meetWithCamp);

  return (
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <MeetTitleSection
        meetWithCamp={meetWithCamp}
        buttonConfig={buttonConfig}
      />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
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
