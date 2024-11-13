import { format } from "date-fns";
import React from "react";
import { CellCard } from "./type/schedule.types";
import { getMeetCardStyle } from "./utils/calenderService";
import { useRouter } from "next/navigation";

type Props = {
  day: Date;
  cellCardList: CellCard[];
  hoverItem: string;
  handleHoverItem: (id: string) => void;
};

// TODO 스탬프, 모임 필터링 데이터는 여기서 하는게 나을까?
// 캘린더 한 칸
const CalendarCell = ({
  day,
  cellCardList,
  hoverItem,
  handleHoverItem
}: Props) => {
  const router = useRouter();
  const showStamp = true;

  if (!cellCardList) {
    cellCardList = [];
  }

  const stampCardList = cellCardList.filter(
    (cellCard) => cellCard.type === "stamp"
  );

  console.log("stampCardList", stampCardList);

  const meetCard = cellCardList.find((cellCard) => cellCard.type === "meet");
  const meetCardId = meetCard ? `${meetCard.type}-${meetCard.typeId}` : "";

  const meetCardStyle = getMeetCardStyle(meetCard);

  const meetCardContentBg =
    hoverItem === meetCardId ? "bg-[#FF731A]" : "bg-[#FFD0B2]";

  return (
    <li className="flex min-h-[105px] w-full flex-col border-[1px]">
      <section className="flex h-[20px] w-full justify-end">
        <p className="p-[10px]">{format(day, "d")}</p>
      </section>
      <section className="relative flex flex-col justify-end">
        <div className="h-[50px]">
          {meetCard && (
            <div
              className={`absolute top-[10px] z-50 cursor-pointer`}
              style={{ ...meetCardStyle }}
              onMouseOver={() => handleHoverItem(meetCardId)}
              onMouseLeave={() => handleHoverItem("")}
              onClick={() => {
                router.push(`/meets/${meetCard.typeId}`);
              }}
            >
              <div className={`w-full ${meetCardContentBg}`}>
                {meetCard.content}
              </div>
            </div>
          )}
        </div>
        <ul className="flex w-full flex-row-reverse flex-wrap justify-between gap-2 p-[10px]">
          {showStamp &&
            stampCardList.map((stamp) => (
              <li key={`${stamp.id}`} className="">
                <div className="h-[21px] w-[18px] bg-stamp bg-cover bg-center" />
              </li>
            ))}
        </ul>
      </section>
    </li>
  );
};

export default CalendarCell;
