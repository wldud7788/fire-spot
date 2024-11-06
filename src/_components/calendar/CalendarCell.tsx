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

  const meetCard = cellCardList.find((cellCard) => cellCard.type === "meet");
  const meetCardId = meetCard ? `${meetCard.type}-${meetCard.typeId}` : "";

  const meetCardStyle = getMeetCardStyle(meetCard);

  const meetCardContentBg =
    hoverItem === meetCardId ? "bg-red-50" : "bg-slate-200";

  return (
    <li className="flex min-h-[105px] w-full flex-col border-[0.5px]">
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
        <ul className="grid w-full grid-cols-3 gap-2">
          {showStamp &&
            stampCardList.map((stamp) => (
              <li key={`${stamp.id}`} className="h-12 bg-slate-500">
                {/* {stamp.content} */}
                stamp
              </li>
            ))}
        </ul>
      </section>
    </li>
  );
};

export default CalendarCell;
