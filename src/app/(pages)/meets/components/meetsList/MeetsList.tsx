"use client";

import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "../../utils/convertMeetDataToMeetCard";
import WriteButton from "../meets/WriteButton";
import usePagination from "@/_components/pagination/hooks/pagination";
import Pagination from "@/_components/pagination/Pagination";
import CommunityTop from "@/_components/common/CommunityTop";
import { useState } from "react";
import NoData from "@/_components/common/NoData";
import { useMeetList } from "../../hooks/useMeetList";
import MeetsListSkeleton from "./MeetsListSkeleton";

type MeetsListProps = {
  itemsPerPage: number;
};

const MeetsList = ({ itemsPerPage }: MeetsListProps) => {
  const [isDeadline, setIsDeadline] = useState<boolean>(false);
  const { meetWithCampList, isProgress, toggleShowType } = useMeetList();

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: meetWithCampList || [], itemsPerPage });

  const meetCardList = convertMeetDataToMeetCard(currentItems, isProgress);

  const handleDeadlineCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDeadline(!isDeadline);
  };

  return (
    <div className="camp_detail mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <CommunityTop text={"캠핑모임"} />
        <div className="utils flex items-center justify-between max-767:flex-col max-767:gap-[10px]">
          <div className="flex items-center gap-[14px] max-1280:gap-[8px] max-767:w-full max-767:justify-start">
            <button
              className={`rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold max-1280:px-[12px] max-1280:py-[6px] max-767:text-[12px] ${isProgress ? "border-[#ff924c]" : ""}`}
              onClick={() => toggleShowType(true)}
            >
              모집중
            </button>
            <button
              className={`rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold max-1280:px-[12px] max-1280:py-[6px] max-767:text-[12px] ${!isProgress ? "border-[#ff924c]" : ""}`}
              onClick={() => toggleShowType(false)}
            >
              마감
            </button>
            <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold max-1280:px-[12px] max-1280:py-[6px] max-767:text-[12px]">
              초보가능
            </button>
            <div className="input_box relative ml-[10px]">
              <input
                type="checkbox"
                id="likeChk"
                checked={isDeadline}
                onChange={handleDeadlineCheck}
                className="absolute left-0 top-0 h-full w-full opacity-0"
              />
              <label
                htmlFor="likeChk"
                className={`${isDeadline ? "bg-chkOn" : "bg-chk"} bg-left-center-0 bg-no-repeat pl-[25px] max-767:py-[5px] max-767:text-[12px]`}
              >
                마감 임박
              </label>
            </div>
          </div>
          <div className="max-767:flex max-767:w-full max-767:justify-end">
            <WriteButton>모임 만들기</WriteButton>
          </div>
        </div>

        {meetWithCampList ? (
          <>
            {meetCardList ? (
              <>
                <ul className="mt-[40px] flex flex-wrap gap-[20px] max-1280:gap-[20px] max-767:mt-[20px] max-767:flex-col">
                  {meetCardList.map((meetCard) => (
                    <li
                      key={meetCard.id}
                      className="w-[calc(50%-10px)] max-767:w-full"
                    >
                      {" "}
                      {/* 각 아이템을 50% 너비로 설정 */}
                      <MeetCard meetCard={meetCard} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="mt-[40px]">
                <NoData text={"등록된 모임이 없어요."} />
              </div>
            )}
          </>
        ) : (
          <MeetsListSkeleton />
        )}

        {/* <ul className="grid grid-cols-3">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id}>
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul> */}

        <div className="my-[65px]">
          <Pagination
            page={page}
            totalPages={totalPages}
            onMovePagePrev={movePagePrev}
            onMovePageNext={movePageNext}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetsList;
