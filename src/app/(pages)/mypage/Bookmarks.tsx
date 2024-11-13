"use client";

import BookmarkList from "@/_components/bookmark/BookmarkList";
import NoData from "@/_components/common/NoData";

const Bookmarks: React.FC = () => {
  return (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h2 className="mb-[40px] text-[18px] font-bold">
          내가 스크랩한 캠핑장
        </h2>
        <BookmarkList />
      </div>
      <div>
        <h2 className="mb-[40px] text-[18px] font-bold">내가 스크랩한 모임</h2>
        {false ? (
          <>
            false를 모임 데이터 들어왔는지로 조건 변경 하고 모임 리스트
            뿌려주세요.
          </>
        ) : (
          <NoData text={"스크랩한 모임이 없어요."} />
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
