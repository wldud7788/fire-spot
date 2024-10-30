import MeetCard from "@/_components/meet/MeetCard";

const MeetsTestPage = () => {
  const meets = [
    {
      id: 0,
      tags: ["마감임박", "글램핑"],
      title: "불멍좋아하는사람 모여라!",
      location: "영양군",
      date: "10.25(수)",
      personnelCount01: 5,
      personnelCount02: 10
    },
    {
      id: 1,
      tags: ["마감임박22", "글램핑22"],
      title: "불멍좋아하는사람 모여라!22",
      location: "영양군",
      date: "10.25(수)",
      personnelCount01: 5,
      personnelCount02: 10
    },
    {
      id: 2,
      tags: ["마감임박33", "글램핑33"],
      title: "불멍좋아하는사람 모여라!33",
      location: "영양군",
      date: "10.25(수)",
      personnelCount01: 5,
      personnelCount02: 10
    }
  ];
  return (
    <ul className="flex flex-wrap items-center gap-[50px]">
      {meets.map((meet, idx) => {
        return (
          <li key={idx} className="w-[calc(50%-50px)]">
            <MeetCard meet={meet} />
          </li>
        );
      })}
    </ul>
  );
};

export default MeetsTestPage;
