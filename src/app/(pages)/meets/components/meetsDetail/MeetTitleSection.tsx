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
    <div className="mt-4 flex w-full gap-[45px]">
      <div className="h-[350px] w-[460px] flex-none overflow-hidden rounded-[20px] border border-[#A6A6A6]">
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
      <div className="flex w-full max-w-[calc(rgba(100%-505px))] flex-col rounded-[18px] border border-[#A6A6A6] p-[27px]">
        <section className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold">{meet.title}</h2>
          <div className="flex items-center justify-end gap-[10px]">
            <button type="button">
              <img src="/assets/images/ico-heart.svg" alt="북마크" />
            </button>
            <button type="button">
              <img src="/assets/images/common/ico-share.svg" alt="공유하기" />
            </button>
          </div>
        </section>

        <section className="mt-[40px] flex flex-col gap-[18px]">
          <div className="flex items-center">
            <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetCalendar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
              <span className="inline-block w-[60px] text-justify text-[16px] font-bold">
                일시
              </span>
            </p>
            <p className="color-gray02 text-[16px]">
              {formatDate_4(meet.start_date)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetLocation bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
              <span className="inline-block w-[60px] text-justify text-[16px] font-bold">
                장소
              </span>
            </p>
            <p className="color-gray02 text-[16px]">{camp.addr1}</p>
          </div>
          <div className="flex items-center">
            <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetAvatar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
              <span className="inline-block w-[60px] text-justify text-[16px] font-bold">
                모집인원
              </span>
            </p>
            <p className="color-gray02 text-[16px]">
              {" "}
              {meet.deadline_headcount}명 모집 {attendee_count}/
              {meet.deadline_headcount}
            </p>
          </div>
        </section>
        <div className="mt-[30px] flex items-center justify-between">
          <section className="flex gap-6">
            {tags.map((tag) => (
              <div key={tag} className="flex flex-col items-center gap-[6px]">
                <div className="h-[40px] w-[40px] rounded-full bg-[#d9d9d9]"></div>
                <p className="color-gray01 text-[14px]">{tag}</p>
              </div>
            ))}
          </section>
          <section className="flex gap-[18px]">
            <button
              className={`flex h-[60px] w-[230px] items-center justify-center rounded-[18px] border bg-[#B24600] text-[18px] font-bold text-white ${buttonConfig.className && "opacity-[0.5]"}`}
              disabled={buttonConfig.disabled}
              onClick={() => buttonConfig.onClick(meet.id)}
            >
              {buttonConfig.text}
            </button>
            {hasChatAccess && (
              <button
                className={`flex h-[60px] w-[230px] items-center justify-center rounded-[18px] border bg-[#ac8064] text-[18px] font-bold text-white`}
              >
                <Link href={SERVER_PAGE_URL.chatRoom(chat_room_id)}>
                  모임 톡
                </Link>
              </button>
            )}
            {!hasChatAccess && (
              <button
                className={`flex h-[60px] w-[150px] items-center justify-center rounded-[18px] border bg-[#ac8064] text-[18px] font-bold text-white opacity-[0.5]`}
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
