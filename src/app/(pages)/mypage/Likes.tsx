"use client";

import NoData from "@/_components/common/NoData";
import LikeList from "@/_components/like/LikeList";

const Likes: React.FC = () => {
  return (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h2 className="mb-[40px] text-[18px] font-bold">
          내가 좋아요한 캠핑장
        </h2>
        <LikeList />
      </div>
      <div>
        <h2 className="mb-[40px] text-[18px] font-bold">내가 좋아요한 모임</h2>
        {false ? (
          <>
            false를 모임 데이터 들어왔는지로 조건 변경 하고 모임 리스트
            뿌려주세요.
          </>
        ) : (
          <NoData text={"좋아요한 모임이 없어요."} />
        )}
      </div>
    </div>
  );
};

export default Likes;