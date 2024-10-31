"use client";
import { MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";
import useMeetController from "../../hooks/useMeetController";

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetDetailController = ({ meetWithCamp }: Props) => {
  const { attendButtonValid, handleAttendPost, handleAttendDelete } =
    useMeetController(meetWithCamp);

  return (
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px]">
      <MeetTitleSection
        meetWithCamp={meetWithCamp}
        attendButtonValid={attendButtonValid}
        handleAttendPost={handleAttendPost}
        handleAttendDelete={handleAttendDelete}
      />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetDetailController;
