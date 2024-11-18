"use client";

import CampCard from "@/_components/camp/CampCard";
import Pagination from "../pagination/Pagination";
import usePagination from "../pagination/hooks/pagination";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTotalData } from "@/_utils/api/campsApi";
import PageTitle from "../common/PageTitle";
import useIntersectionObserver from "@/_hooks/useInteraction";

type CampListProps = {
  itemsPerPage: number;
};

const CampList = ({ itemsPerPage }: CampListProps) => {
  const [islikeChk, setIslikeChk] = useState<boolean>(false);
  const { data: camps, isError } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => fetchTotalData(),
    staleTime: Infinity
  });

  const { currentItems, page, totalPages, movePagePrev, movePageNext } =
    usePagination({ items: camps || [], itemsPerPage });

  const { isVisible, targetRef } = useIntersectionObserver({
    threshold: 0.5, // 50% 이상 보일 때 감지
    rootMargin: "0px" // 여백 없음
  });

  // 페이지 번호가 변경되면 해당 페이지로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 상단으로 스크롤
  }, [page]);

  if (!currentItems) return <div>데이터가 로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handlelikeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIslikeChk(!islikeChk);
  };

  return (
    <div className="camp_list my-[65px] max-767:mb-[60px] max-767:mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <PageTitle text={"캠핑장 리스트"} />
        {/* 이윤지 작업 - 내가 찜한 캠핑장 모아보기 */}
        <div
          className="input_box ani ani-btt relative mb-[40px] mt-[15px]"
          ref={targetRef}
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            opacity: isVisible ? 1 : 0,
            transition: "all .5s ease .5s"
          }}
        >
          <input
            type="checkbox"
            id="likeChk"
            checked={islikeChk}
            onChange={handlelikeCheck}
            className="absolute left-0 top-0 h-full w-full opacity-0"
          />
          <label
            htmlFor="likeChk"
            className={`${islikeChk ? "bg-chkOn" : "bg-chk"} bg-left-center-0 bg-no-repeat pl-[25px] max-767:py-[3px] max-767:text-[13px]`}
          >
            내가 찜한 캠핑장 모아보기
          </label>
        </div>
        <ul className="list_box flex flex-wrap gap-[30px] max-989:gap-[15px]">
          {currentItems.map((camp) => (
            <li
              key={camp.contentId}
              className="w-[calc(25%-22.5px)] max-989:w-[calc(50%-8px)] max-450:w-full"
            >
              <CampCard camp={camp} />
            </li>
          ))}
        </ul>
        <div className="max-767:mt-[30px]">
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

export default CampList;
