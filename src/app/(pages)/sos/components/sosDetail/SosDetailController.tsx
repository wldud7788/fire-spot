"use client";
import useSosRemainingTime from "../../hooks/useSosRemainingTime";
import { SosWithCamp } from "../../types/sos.types";
import SosRemainingTimeSection from "./section/SosRemainingTimeSection";
import SosTagSection from "./section/SosTagSection";
import SosTitleSection from "./section/SosTitleSection";
import SosUserSection from "./section/SosUserSection";

type Props = {
  sosWithCamp: SosWithCamp;
};
const SosDetailController = ({ sosWithCamp }: Props) => {
  const { sos } = sosWithCamp;

  return (
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <SosTitleSection sos={sos} />
      <SosUserSection sosWithCamp={sosWithCamp} />
      <SosTagSection sos={sos} />
      <SosRemainingTimeSection sos={sos} />
      {/* <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection /> */}
    </div>
  );
};

export default SosDetailController;
