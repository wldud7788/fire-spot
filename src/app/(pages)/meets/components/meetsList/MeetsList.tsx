"use client";

import MeetCard from "@/_components/meet/MeetCard";
import { getMeetList } from "../../actions/meetListAction";
import { MeetWithCamp } from "../../types/meet.types";
import { convertMeetDataToMeetCard } from "../../utils/convertMeetDataToMeetCard";
import WriteButton from "../meets/WriteButton";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@/_components/pagination/hooks/pagination";
import Pagination from "@/_components/pagination/Pagination";
import CommunityTop from "@/_components/common/CommunityTop";
import { useState } from "react";
import NoData from "@/_components/common/NoData";

type MeetsListProps = {
  itemsPerPage: number;
};

const MeetsList = ({ itemsPerPage }: MeetsListProps) => {
  const [isDeadline, setIsDeadline] = useState<boolean>(false);
  const { data: meetWithCampList, isError } = useQuery<MeetWithCamp[]>({
    queryKey: ["meets"],
    queryFn: async () => getMeetList()
  });

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: meetWithCampList || [], itemsPerPage });

  if (!currentItems) return <>데이터 로딩중.</>;

  const meetCardList = convertMeetDataToMeetCard(currentItems);

  const handleDeadlineCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDeadline(!isDeadline);
  };

  return (
    <div className="camp_detail mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <CommunityTop text={"캠핑모임"} />
        <div className="utils flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold">
              모집중
            </button>
            <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold">
              마감
            </button>
            <button className="rounded-[20px] border border-[#a6a6a6] px-[16px] py-[10px] text-[14px] font-bold">
              초보가능
            </button>
            <div className="input_box relative ml-[10px]">
              <input
                type="checkbox"
                id="bookMarkChk"
                checked={isDeadline}
                onChange={handleDeadlineCheck}
                className="absolute left-0 top-0 h-full w-full opacity-0"
              />
              <label
                htmlFor="bookMarkChk"
                className={`${isDeadline ? "bg-chkOn" : "bg-chk"} bg-left-center-0 bg-no-repeat pl-[25px]`}
              >
                마감이 임박한 것부터 보기
              </label>
            </div>
          </div>
          <div>
            <WriteButton>모임 만들기</WriteButton>
          </div>
        </div>
        {meetCardList ? (
          <>
            <ul className="mt-[40px] flex flex-wrap justify-center gap-[40px]">
              {meetCardList.map((meetCard) => (
                <li key={meetCard.id} className="w-[calc(50%-20px)]">
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
