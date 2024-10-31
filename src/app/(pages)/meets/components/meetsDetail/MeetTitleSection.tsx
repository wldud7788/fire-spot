import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import Slide from "@/_components/slide/Slide";
import { formatDate_4 } from "@/_utils/common/dateFormat";
import { ButtonConfig } from "../../hooks/useMeetDetailController";
interface Props {
  meetWithCamp: MeetWithCamp;
  buttonConfig: ButtonConfig;
}

const MeetTitleSection = ({ meetWithCamp, buttonConfig }: Props) => {
  const { meet, camp } = meetWithCamp;
  const tags = camp.induty.split(",");

  if (meet.is_day_trip) {
    tags.push("당일치기");
  }
  if (meet.is_newbie) {
    tags.push("초보가능");
  }

  return (
    <div className="mt-4 flex w-full gap-[50px]">
      <div className="h-[472px] w-[472px] rounded-3xl bg-black">
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
            <div className="h-[52px] w-[52px] bg-heart bg-cover bg-center" />
            <div className="h-[52px] w-[52px] bg-scrap bg-contain bg-center bg-no-repeat" />
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-location bg-cover bg-center" />
            <p className="text-[#757575]">{camp.addr1}</p>
          </div>
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-date bg-cover bg-center" />
            <p className="text-[#757575]">{formatDate_4(meet.start_date)}</p>
          </div>
          <div className="flex h-7 items-center gap-2">
            <div className="h-7 w-7 bg-avatar bg-cover bg-center" />
            <p className="text-[#757575]">
              {meet.deadline_headcount}명 모집 {meet.attendee_count}/
              {meet.deadline_headcount}
            </p>
          </div>
        </section>
        <section className="flex gap-6">
          {tags.map((tag) => (
            <div key={tag} className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#EAEAEA]"></div>

              <p className="text-[#757575]">{tag}</p>
            </div>
          ))}
        </section>
        <section className="flex gap-[18px]">
          <button
            className={`h-[67px] w-[261px] rounded-[6px] text-2xl ${buttonConfig.className}`}
            disabled={buttonConfig.disabled}
            onClick={buttonConfig.onClick}
          >
            {buttonConfig.text}
          </button>
          <button
            className={`h-[67px] w-[261px] rounded-[6px] border-[2px] border-black text-2xl text-[#D0D0D0]`}
            disabled={buttonConfig.disabled}
          >
            채팅하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default MeetTitleSection;
