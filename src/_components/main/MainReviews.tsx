import FeedCard from "../feed/FeedCard";

const MainReviews = () => {
  // [이윤지 작업] 리뷰 랜덤으로 5개 리스트 출력해주면 됩니다.
  // 메인 임시로 적용하기 위해 더미데이터 사용함 (실제 데이터 사용하면 아래 지워주세요)
  const feeds = [
    {
      id: 1,
      like: 4,
      img: "/assets/images/dummy/@dummy-main-review-01.jpg",
      title: "너무 만족합니다!",
      desc: "처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서",
      profileImg:
        "http://k.kakaocdn.net/dn/caeJXl/btsKrC8yWWV/TQ3b3hXdn8KzD7tBK7Seg0/img_640x640.jpg",
      userName: "킹갓제너럴이준열",
      date: "2024,10,27"
    },
    {
      id: 2,
      like: 4,
      img: "/assets/images/dummy/@dummy-main-review-02.jpg",
      title: "너무 만족합니다!",
      desc: "처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서",
      profileImg:
        "http://k.kakaocdn.net/dn/caeJXl/btsKrC8yWWV/TQ3b3hXdn8KzD7tBK7Seg0/img_640x640.jpg",
      userName: "킹갓제너럴이준열",
      date: "2024,10,27"
    },
    {
      id: 3,
      like: 4,
      img: "/assets/images/dummy/@dummy-main-review-03.jpg",
      title: "너무 만족합니다!",
      desc: "처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서",
      profileImg:
        "http://k.kakaocdn.net/dn/caeJXl/btsKrC8yWWV/TQ3b3hXdn8KzD7tBK7Seg0/img_640x640.jpg",
      userName: "킹갓제너럴이준열",
      date: "2024,10,27"
    },
    {
      id: 4,
      like: 4,
      img: "/assets/images/dummy/@dummy-main-review-01.jpg",
      title: "너무 만족합니다!",
      desc: "처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서",
      profileImg:
        "http://k.kakaocdn.net/dn/caeJXl/btsKrC8yWWV/TQ3b3hXdn8KzD7tBK7Seg0/img_640x640.jpg",
      userName: "킹갓제너럴이준열",
      date: "2024,10,27"
    },
    {
      id: 5,
      like: 4,
      img: "/assets/images/dummy/@dummy-main-review-02.jpg",
      title: "너무 만족합니다!",
      desc: "처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서 처음 가본 캠핑장인데 시설이 너무 깔끔 하고 편리하게 되어 있어 마음에 쏙 들고 밤하늘엔 별이 쏟아져 감탄을 자아내서",
      profileImg:
        "http://k.kakaocdn.net/dn/caeJXl/btsKrC8yWWV/TQ3b3hXdn8KzD7tBK7Seg0/img_640x640.jpg",
      userName: "킹갓제너럴이준열",
      date: "2024,10,27"
    }
  ];

  return (
    <ul className="mb-[40px] mt-[50px] flex items-center justify-center gap-[20px]">
      {feeds.map((feed) => {
        return (
          <li key={feed.id}>
            <FeedCard feed={feed} type={"main"} />
          </li>
        );
      })}
    </ul>
  );
};

export default MainReviews;
