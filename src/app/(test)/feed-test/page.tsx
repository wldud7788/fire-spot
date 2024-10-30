import FeedCard from "@/_components/feed/FeedCard";

const FeedTestPage = () => {
  const dummyData = [
    {
      id: 0,
      time: "몇시간 전",
      profileImg: "프로필 이미지",
      userName: "민규",
      desc: "캠핑은 단순한 여행을 넘어 우리에게 잊지 못할 추억과 쉼의 가치를 알려준 소중한 경험이었으며, 앞으로도 가족과 함께 자연 속에서 또 다른 추억을 쌓을 생각에 마음이 설렙니다.",
      img: ["", "", ""],
      like: 1
    },
    {
      id: 2,
      time: "몇시간 전",
      profileImg: "프로필 이미지",
      userName: "rurulralalra",
      desc: "캠핑은 단순한 여행을 넘어 우리에게 잊지 못할 추억과 쉼의 가치를 알려준 소중한 경험이었으며, 앞으로도 가족과 함께 자연 속에서 또 다른 추억을 쌓을 생각에 마음이 설렙니다.",
      img: ["", "", ""],
      like: 5
    },
    {
      id: 3,
      time: "몇시간 전",
      profileImg: "프로필 이미지",
      userName: "Wkdalsrb",
      desc: "캠핑은 단순한 여행을 넘어 우리에게 잊지 못할 추억과 쉼의 가치를 알려준 소중한 경험이었으며, 앞으로도 가족과 함께 자연 속에서 또 다른 추억을 쌓을 생각에 마음이 설렙니다.",
      img: ["", "", ""],
      like: 12
    }
  ];
  return (
    <ul className="reviewTestPage">
      {dummyData.map((data, idx) => {
        return (
          <li key={idx}>
            <FeedCard feed={data} />
          </li>
        );
      })}
    </ul>
  );
};

export default FeedTestPage;
