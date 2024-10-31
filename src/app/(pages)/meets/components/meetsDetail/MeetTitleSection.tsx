import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import Slide from "@/_components/slide/Slide";
import { formatDate_2 } from "@/_utils/common/dateFormat";
type Props = {
  meetWithCamp: MeetWithCamp;
  handleAttendPost: () => Promise<void>;
  handleAttendDelete: () => Promise<void>;
  attendButtonValid: {
    isAttendButtonVisible: boolean;
    buttonState: {
      text: string;
      type: "post" | "delete" | "deadline" | "notLoggedIn" | "skelton";
      enabled: boolean;
    };
  };
};
const MeetTitleSection = ({
  meetWithCamp,
  handleAttendPost,
  handleAttendDelete,
  attendButtonValid
}: Props) => {
  const { meet, camp } = meetWithCamp;
  const { buttonState } = attendButtonValid;

  return (
    <div className="mt-4 flex w-full gap-[50px]">
      <div className="h-[472px] w-[472px] bg-black">
        <Slide slidePerview={1} onChangeEvent={() => {}}>
          {camp.imgUrls.map((url) => (
            <div
              key={url}
              className="h-[472px] w-[472px] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          ))}
        </Slide>
      </div>
      <div className="flex h-[472] w-[776px] flex-col gap-8 rounded-xl border-[2px] p-[50px]">
        <section className="flex items-center justify-between">
          <h2 className="text-4xl">{meet.title}</h2>
          <div className="flex gap-6 text-4xl">
            <div>♥</div>
            <div>★</div>
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-location bg-cover bg-center" />
            <p>{camp.addr1}</p>
          </div>
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-calendar bg-cover bg-center" />
            <p>{formatDate_2(meet.start_date)}</p>
          </div>
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-avatar bg-cover bg-center" />
            <p>
              {meet.deadline_headcount}명 모집 {meet.attendee_count}/
              {meet.deadline_headcount}
            </p>
          </div>
        </section>

        <p>{camp.induty.split(",")}</p>
        <p>당일치기 {meet.is_day_trip.toString()}</p>
      </div>
      {/* {buttonState.type === "post" && (
        <button className="bg-slate-500" onClick={() => handleAttendPost()}>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "delete" && (
        <button className="bg-slate-500" onClick={() => handleAttendDelete()}>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "deadline" && (
        <button className="bg-slate-500" disabled>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "skelton" && (
        <button
          className="bg-slate-500"
          onClick={() => alert("로그인한 유저만 가능합니다.")}>
          신청하기
        </button>
      )} */}
    </div>
  );
};

export default MeetTitleSection;
