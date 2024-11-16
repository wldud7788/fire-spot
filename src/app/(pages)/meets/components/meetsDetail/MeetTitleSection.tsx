import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import Slide from "@/_components/slide/Slide";
import { formatDate_4 } from "@/_utils/common/dateFormat";
import { ButtonConfig } from "../../hooks/useMeetDetailController";
import Link from "next/link";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
interface Props {
  meetWithCamp: MeetWithCamp;
  buttonConfig: ButtonConfig;
  hasChatAccess: boolean;
}

const MeetTitleSection = ({
  meetWithCamp,
  buttonConfig,
  hasChatAccess
}: Props) => {
  const { meet, camp, attendee_count, chat_room_id } = meetWithCamp;
  const tags = [];

  if (camp.induty) {
    camp.induty.split(",").forEach((tag) => tags.push(tag.trim()));
  } else {
    tags.push("캠핑장");
  }

  if (meet.is_day_trip) {
    tags.push("당일치기");
  }
  if (meet.is_newbie) {
    tags.push("초보가능");
  }

  return (
    <div className="mt-4 flex w-full gap-[45px] max-1280:gap-[20px] max-989:flex-col">
      <div className="main-slide-wrap min-h-[350px] w-[460px] flex-none overflow-hidden rounded-[20px] border border-[#A6A6A6] max-989:min-h-[310px] max-989:w-full">
        <Slide slidePerview={1} onChangeEvent={() => {}}>
          {camp.imgUrls.map((url) => (
            <div
              key={url}
              className="h-[350px] w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          ))}
        </Slide>
      </div>
      <div className="flex w-full max-w-[calc(rgba(100%-505px))] flex-col justify-between rounded-[18px] border border-[#A6A6A6] p-[27px] max-767:p-[20px]">
        <div>
          <section className="flex items-center justify-between">
            <h2 className="text-[28px] font-bold max-1280:text-[24px] max-1160:text-[22px] max-989:text-[18px]">
              {meet.title}
            </h2>
            <div className="flex w-[70px] flex-none items-center justify-end gap-[10px]">
              <button type="button">
                <img src="/assets/images/common/ico-share.svg" alt="공유하기" />
              </button>
            </div>
          </section>

          <section className="mt-[40px] flex flex-col gap-[15px] max-1280:mt-[25px] max-1280:gap-[10px] max-767:gap-[10px]">
            <div className="flex items-center">
              <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetCalendar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
                <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-989:w-[50px] max-989:text-[13px]">
                  일시
                </span>
              </p>
              <p className="color-gray02 text-[16px] max-1280:text-[14px] max-989:text-[13px]">
                {formatDate_4(meet.start_date)}
              </p>
            </div>
            <div className="flex items-center">
              <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetLocation bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
                <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-989:w-[50px] max-989:text-[13px]">
                  장소
                </span>
              </p>
              <p className="color-gray02 text-[16px] max-1280:text-[14px] max-989:text-[13px]">
                {camp.addr1}
              </p>
            </div>
            <div className="flex items-center">
              <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetAvatar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
                <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-989:w-[50px] max-989:text-[13px]">
                  모집인원
                </span>
              </p>
              <p className="color-gray02 text-[16px] max-1280:text-[14px] max-989:text-[13px]">
                {" "}
                {meet.deadline_headcount}명 모집 {attendee_count}/
                {meet.deadline_headcount}
              </p>
            </div>
          </section>
        </div>
        <div className="mt-[30px] flex items-center justify-between gap-[20px] max-989:mt-[20px] max-989:flex-col max-989:items-start">
          <section className="flex w-[calc(40%-10px)] gap-6 max-989:w-full">
            {tags.map((tag) => (
              <div key={tag} className="flex flex-col items-center gap-[6px]">
                <div className="h-[40px] w-[40px] rounded-full bg-[#d9d9d9] max-989:h-[35px] max-989:w-[35px]"></div>
                <p className="color-gray01 text-[14px] max-1280:text-[13px] max-989:text-[12px]">
                  {tag}
                </p>
              </div>
            ))}
          </section>
          <section className="flex w-[calc(50%-10px)] gap-[10px] max-989:w-full">
            <button
              className={`flex h-[60px] w-[60%] items-center justify-center rounded-[18px] border bg-[#B24600] text-[18px] font-bold text-white ${buttonConfig.className && "opacity-[0.5]"} max-1280:h-[50px] max-1280:text-[16px]`}
              disabled={buttonConfig.disabled}
              onClick={() => buttonConfig.onClick(meet.id)}
            >
              {buttonConfig.text}
            </button>
            {hasChatAccess && (
              <button
                className={`flex h-[60px] w-[50%] items-center justify-center rounded-[18px] border bg-[#ac8064] text-[18px] font-bold text-white max-1280:h-[50px] max-1280:text-[16px]`}
              >
                <Link href={SERVER_PAGE_URL.chatRoom(chat_room_id)}>
                  모임 톡
                </Link>
              </button>
            )}
            {!hasChatAccess && (
              <button
                className={`flex h-[60px] w-[50%] items-center justify-center rounded-[18px] border bg-[#ac8064] text-[18px] font-bold text-white opacity-[0.5] max-1280:h-[50px] max-1280:text-[16px]`}
                disabled
              >
                모임 톡
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MeetTitleSection;
