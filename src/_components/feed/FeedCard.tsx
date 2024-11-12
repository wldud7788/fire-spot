import { FeedItem } from "@/app/(pages)/feeds/types/Feed";
import Link from "next/link";

// FeedCardProps 타입 정의
type FeedCardProps = {
  feed: FeedItem;
  type?: string;
  onClickFunc?: () => void; // 선택적으로 전달되는 클릭 함수 추가
};

const FeedCard = ({ feed, type, onClickFunc }: FeedCardProps) => {
  const TOTAL_STAR = 5;
  const activeStars = Array.from({ length: feed.rating });
  const defaultStars = Array.from({ length: TOTAL_STAR - feed.rating });

  return (
    <>
      {type ? (
        // type main
        <div className="feed_card type_main group overflow-hidden rounded-[12px] border border-[#d9d9d9]">
          <div className="inner">
            <div className="ibox overflow-hidden">
              <img
                className="transform transition-all duration-500 ease-in-out group-hover:scale-110"
                src={feed.camp?.firstImageUrl || ""}
                alt={`${feed.title} 이미지`}
              />
            </div>
            <div className="info bg-white px-[16px] py-[14px]">
              <div className="star flex items-center gap-[2px]">
                {activeStars.map((_, index) => {
                  return (
                    <img
                      key={`active-star-${index}`}
                      src={`/assets/images/common/ico-star-c.svg`}
                      alt={"별 이미지"}
                    />
                  );
                })}
                {defaultStars.map((_, index) => {
                  return (
                    <img
                      key={`default-star-${index}`}
                      src={`/assets/images/common/ico-star.svg`}
                      alt={"별 이미지"}
                    />
                  );
                })}
              </div>
              <strong className="color-gray01 my-[5px] line-clamp-1 block w-full text-[16px] font-bold">
                {feed.title}
              </strong>
              <p className="color-gray01 line-clamp-3 min-h-[51px] text-[12px]">
                {feed.content}
              </p>
              <div className="user_area mt-[10px] flex items-center gap-[10px] border-t border-[#dbdbdb] pt-[10px]">
                <div className="user_img h-[36px] w-[36px] overflow-hidden rounded-[100%]">
                  {/* [이윤지 적용] 링크는 /profile/${유저아이디}로 적용 부탁드립니다. */}
                  <Link href={`/profile/378b4f02-105a-4812-bfca-b3f75114bd0e`}>
                    <img
                      src={
                        feed.profile?.avatar_url ||
                        "/assets/images/default_profile.jpeg"
                      }
                      alt={`${feed.profile?.nickname || "유저 정보 없음"} 의 프로필 사진`}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
                <div className="user_info flex flex-col">
                  <p className="color-gray01 line-clamp-1 w-full text-[14px]">
                    {feed.profile?.nickname}
                  </p>
                  <span className="color-gray03 text-[12px]">{feed.at}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 나는 이윤지 짱
        // type default
        <div className="feed_card">
          <div className="inner">
            <div className="user_info">
              {/* 캠핑장 이름에 클릭 이벤트를 조건부로 추가 */}
              <div
                onClick={onClickFunc ? () => onClickFunc() : undefined} // 클릭 함수가 있는 경우에만 실행
                style={{ cursor: onClickFunc ? "pointer" : "default" }} // 클릭 가능한 경우 포인터 커서 표시
              >
                {feed.profile?.nickname}
              </div>
              <img
                src={
                  feed.profile?.avatar_url ||
                  "/assets/images/default_profile.jpeg"
                }
                alt={`${feed.profile?.nickname} 의 프로필 사진`}
                className="h-full w-full object-cover"
              />
              <div>{feed.at}</div>
            </div>
            <div className="feed_desc">
              <p>{feed.content}</p>
            </div>
            <div className="utils">
              <div className="btn_area">
                {/* 좋아요 컴포넌트 적용 필요 */}
                <button>{feed.likes}</button>
                <button>답글 달기</button>
              </div>
              <div className="img_box">
                {/* 이미지 겹쳐있는 컴포넌트 확인 필요 */}
                이미지박스
              </div>
              <div>
                <img src={feed.camp?.firstImageUrl || ""} alt="캠핑장 이미지" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// 24-11-04
// 좋아하는 사람이 생겼다.
/**
 *
 * 그의 이니셜은 M.K
 *
 * 하지만 그는 여자친구가 있다.
 * 난 어떻게 해야할까?
 */
export default FeedCard;
