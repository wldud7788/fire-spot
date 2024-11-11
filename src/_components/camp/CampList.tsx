"use client";

import CampCard from "@/_components/camp/CampCard";
import Pagination from "../pagination/Pagination";
import usePagination from "../pagination/hooks/pagination";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTotalData } from "@/_utils/api/campsApi";
import PageTitle from "../common/PageTitle";

type CampListProps = {
  itemsPerPage: number;
};

const CampList = ({ itemsPerPage }: CampListProps) => {
  const [isBookMarkChk, setIsBookMarkChk] = useState<boolean>(false);
  const {
    data: camps,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => fetchTotalData(),
    staleTime: Infinity
  });

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: camps || [], itemsPerPage });

  // 페이지 번호가 변경되면 해당 페이지로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 상단으로 스크롤
  }, [page]);

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError || !camps) return <div>에러가 발생했습니다.</div>;

  const handleBookMarkCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBookMarkChk(!isBookMarkChk);
  };

  return (
    <div className="camp_list my-[65px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <PageTitle text={"캠핑장 리스트"} />
        {/* 이윤지 작업 - 내가 찜한 캠핑장 모아보기 */}
        <div className="input_box relative mb-[40px] mt-[15px]">
          <input
            type="checkbox"
            id="bookMarkChk"
            checked={isBookMarkChk}
            onChange={handleBookMarkCheck}
            className="absolute left-0 top-0 h-full w-full opacity-0"
          />
          <label
            htmlFor="bookMarkChk"
            className={`${isBookMarkChk ? "bg-chkOn" : "bg-chk"} bg-left-center-0 bg-no-repeat pl-[25px]`}
          >
            내가 찜한 캠핑장 모아보기
          </label>
        </div>
        <ul className="list_box flex flex-wrap gap-[30px]">
          {currentItems.map((camp) => (
            <li key={camp.contentId} className="w-[calc(25%-30px)]">
              <CampCard camp={camp} />
            </li>
          ))}
        </ul>
        <Pagination
          page={page}
          totalPages={totalPages}
          onMovePagePrev={movePagePrev}
          onMovePageNext={movePageNext}
        />
      </div>
    </div>
  );
};

export default CampList;
