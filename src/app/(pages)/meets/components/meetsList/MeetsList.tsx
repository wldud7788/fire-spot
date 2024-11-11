"use client";

import MeetCard from "@/_components/meet/MeetCard";
import { getMeetList } from "../../actions/meetListAction";
import { MeetWithCamp } from "../../types/meet.types";
import { convertMeetDataToMeetCard } from "../../utils/convertMeetDataToMeetCard";
import WriteButton from "../meets/WriteButton";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@/_components/pagination/hooks/pagination";
import Pagination from "@/_components/pagination/Pagination";

type MeetsListProps = {
  itemsPerPage: number;
};

const MeetsList = ({ itemsPerPage }: MeetsListProps) => {
  const { data: meetWithCampList, isError } = useQuery<MeetWithCamp[]>({
    queryKey: ["meets"],
    queryFn: async () => getMeetList()
  });

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: meetWithCampList || [], itemsPerPage });

  if (!currentItems) return <>데이터 로딩중.</>;

  const meetCardList = convertMeetDataToMeetCard(currentItems);

  return (
    <div className="relative mx-auto w-full max-w-[1360px] px-[30px]">
      <div className="absolute right-[30px] top-4 h-[40px]">
        <WriteButton>작성으로 가자</WriteButton>
      </div>
      <ul className="mt-[40px] flex flex-wrap justify-center gap-[23px]">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id} className="w-[44%]">
            {" "}
            {/* 각 아이템을 50% 너비로 설정 */}
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul>
      {/* <ul className="grid grid-cols-3">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id}>
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul> */}

      <Pagination
        page={page}
        totalPages={totalPages}
        onMovePagePrev={movePagePrev}
        onMovePageNext={movePageNext}
      />
    </div>
  );
};

export default MeetsList;