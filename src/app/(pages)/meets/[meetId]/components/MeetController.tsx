"use client";
import React from "react";
import { Meet } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";

type Props = {
  meetDetail: Meet;
};

const MeetController = ({ meetDetail }: Props) => {
  return (
    <div className="mx-auto w-full">
      <MeetTitleSection meetDetail={meetDetail} />
      <MeetIntroSection meetDetail={meetDetail} />
      <MeetContentSection meetDetail={meetDetail} />
      <MeetSuppliesSection meetDetail={meetDetail} />
      <MeetContentSection meetDetail={meetDetail} />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetController;
