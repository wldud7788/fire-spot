import { FeedItem } from "@/app/(pages)/feeds/types/Feed";

type FeedCardProps = {
  feed: FeedItem;
  type?: string;
};

const FeedCard = ({ feed, type }: FeedCardProps) => {
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
              <div>{feed.profileImg}</div>
              <div>{feed.userName}</div>
              <div>{feed.time}</div>
            </div>
            <div className="feed_desc">
              <p>{feed.desc}</p>
            </div>
            <div className="utils">
              <div className="btn_area">
                {/* 좋아요 컴포넌트 적용 필요*/}
                <button>좋아요 1개</button>
                <button>답글 달기</button>
              </div>
              <div className="img_box">
                {/* 이미지 겹쳐있는 컴포넌트 확인 필요*/}
                이미지박스
              </div>
              <div>
                <img src={feed.firstImageUrl} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedCard;
