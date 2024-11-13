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
    hoverItem === meetCardId ? "bg-[#FF731A]" : "bg-[#FFD0B2]";

  return (
    <li className="flex min-h-[105px] w-full flex-col rounded-[10px] border">
      <section className="flex h-[20px] w-full px-[10px] py-[7px]">
        <p className="color-gray01 text-[16px]">{format(day, "d")}</p>
      </section>
      <section className="relative flex flex-col justify-end">
        <div className="h-[50px]">
          {meetCard && (
            <div
              className={`absolute top-[10px] z-50 cursor-pointer p-[6px] ${meetCardContentBg} rounded-[10px]`}
              style={{ ...meetCardStyle }}
              onMouseOver={() => handleHoverItem(meetCardId)}
              onMouseLeave={() => handleHoverItem("")}
              onClick={() => {
                router.push(`/meets/${meetCard.typeId}`);
              }}
            >
              <div className={`line-clamp-1 w-full text-[12px] text-white`}>
                {meetCard.content}
              </div>
            </div>
          )}
        </div>
        <ul className="flex w-full flex-row-reverse flex-wrap justify-between gap-2 p-[10px]">
          {showStamp &&
            stampCardList.map((stamp) => (
              <div
                key={stamp.id}
                className="flex w-[calc(33%-8px)] flex-row-reverse items-center"
              >
                <div className="bg-stamp h-[23px] w-[20px] bg-cover bg-center" />
              </div>
              // <li key={`${stamp.id}`} className="h-12 bg-slate-500">
              //* {stamp.content} */}
              // stamp
              // </li>
            ))}
        </ul>
      </section>
    </li>
  );
};

export default CalendarCell;
