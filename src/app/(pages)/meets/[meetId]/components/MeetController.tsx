"use client";
import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";

type Props = {
  meetAndCamp: MeetWithCamp;
};
const MeetController = ({ meetAndCamp }: Props) => {
  return (
    <div className="mx-auto w-full">
      <MeetTitleSection meetAndCamp={meetAndCamp} />
      <MeetIntroSection meetAndCamp={meetAndCamp} />
      <MeetContentSection meetAndCamp={meetAndCamp} />
      <MeetSuppliesSection meetAndCamp={meetAndCamp} />
      <MeetContentSection meetAndCamp={meetAndCamp} />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetController;
