import { FeedItem } from "@/app/(pages)/feeds/types/Feed";

// FeedCardProps 타입 정의
type FeedCardProps = {
  feed: FeedItem;
  type?: string;
  onClickFunc?: () => void; // 선택적으로 전달되는 클릭 함수 추가
};

const FeedCard = ({ feed, type, onClickFunc }: FeedCardProps) => {
  return (
    <>
      {type ? (
        // type main
        <div className="feed_card type_main"></div>
      ) : (
        // type default
        <div className="feed_card">
          <div className="inner">
            <div className="user_info">
              {/* 캠핑장 이름에 클릭 이벤트를 조건부로 추가 */}
              <div
                onClick={onClickFunc ? () => onClickFunc() : undefined} // 클릭 함수가 있는 경우에만 실행
                style={{ cursor: onClickFunc ? "pointer" : "default" }} // 클릭 가능한 경우 포인터 커서 표시
              >
                {feed.userName}
              </div>
              <div>{feed.profileImg}</div>
              <div>{feed.time}</div>
            </div>
            <div className="feed_desc">
              <p>{feed.desc}</p>
            </div>
            <div className="utils">
              <div className="btn_area">
                {/* 좋아요 컴포넌트 적용 필요 */}
                <button>좋아요 1개</button>
                <button>답글 달기</button>
              </div>
              <div className="img_box">
                {/* 이미지 겹쳐있는 컴포넌트 확인 필요 */}
                이미지박스
              </div>
              <div>
                <img src={feed.firstImageUrl} alt="캠핑장 이미지" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedCard;
