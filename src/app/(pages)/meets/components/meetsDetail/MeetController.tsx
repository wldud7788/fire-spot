"use client";
import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetController = ({ meetWithCamp }: Props) => {
  return (
    <div className="mx-auto w-full">
      <MeetTitleSection meetWithCamp={meetWithCamp} />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetController;
