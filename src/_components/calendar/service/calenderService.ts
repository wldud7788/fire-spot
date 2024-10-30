import {
  addDays,
  differenceInDays,
  endOfWeek,
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds
} from "date-fns";
import { CellCard, CellCardTable, Schedule } from "../type/schedule.types";

/** 
 * 사용자의 schedule(스탬프, 모임)데이터 를 받아서 데이터 변환 
 * 
 * ex)
*   [
*     {
        typeId: 1,
        type: "meet",
        content: "서핑과 함께하는 바닷가 캠핑",
        startDate: "Wed Nov 06 2024 00:00:00 GMT+0900", // 2024.11.06 ~
        endDate: "Thu Nov 08 2024 00:00:00 GMT+0900"    // ~ 2024.11.08
      },
    ]

    위 데이터를 다음과 같이 변환

[2024-10-11]:[
      {
        typeId: 1,
        type: "meet",
        content:"서핑과 함께하는 바닷가 캠핑",
        date: "Wed Nov 06 2024 . . ." // 2024.11.06, // stamp, meet
        isExistPrev:false, 
        isExistNext:true,
        isStartOfWeek:true

      }
    ]
    1) prev와 next
    => 이전 날짜가 있으면 true, 시작 날짜면 false (next도 마찬가지로 다음 날짜가 ...)

    2) isStartOfWeek (startOfWeek 함수)
    => 이전 날짜가 있어도 다음 줄에서 표시되는 경우 "content"를 출력해주어야함.
        1. startDate의 첫 주의 일자를 구한 후 그 일자의 +7한 일자는 true
        2. 매 일자 마다 첫 주인지 확인 

 * 
*/

/** 사용자의 일정(모임, 스탬프) 목록을 CellCardTable 형태로 변환 후 반환 */
export const convertScheduleDataToCellCardTable = (
  // TODO 함수명 변경 convertScheduleDataToCellCardTable
  scheduleList: Schedule[]
): CellCardTable => {
  const cellCardTable: CellCardTable = {};

  scheduleList.forEach((schedule) => {
    const { type, startDate } = schedule;
    let tableKey = format(startDate, "yyyy-MM-dd");

    if (!cellCardTable[tableKey]) {
      cellCardTable[tableKey] = [];
    }

    if (type === "stamp") {
      const stampCellCard = getStampCellCard(schedule);
      cellCardTable[tableKey].push(stampCellCard);
    } else {
      const meetCellCardList = getMeetCellCard(schedule);

      meetCellCardList.forEach((meetCellCard) => {
        tableKey = format(meetCellCard.date, "yyyy-MM-dd");
        if (!cellCardTable[tableKey]) {
          cellCardTable[tableKey] = [];
        }
        cellCardTable[tableKey].push(meetCellCard);
      });
    }
  });

  return cellCardTable;
};

const getStampCellCard = (schedule: Schedule) => {
  const { type, typeId, startDate } = schedule;
  return {
    ...schedule,
    id: `${type}-${typeId}`,
    date: startDate,
    isExistPrev: false,
    isExistNext: false,
    isShowContent: true,
    range: 1
  } as CellCard;
};

const getWeekEndAtMidnight = (weekEnd: Date) => {
  return setHours(setMinutes(setSeconds(setMilliseconds(weekEnd, 0), 0), 0), 0);
};

const getMeetCellCard = (schedule: Schedule) => {
  const { type, typeId, content, startDate, endDate } = schedule;
  const meetCellCardList = [] as CellCard[];

  // 같은 일정인데 일정이 길어짐에 따라 다른 줄(주)에서 다시 생성되는 일정임을 구별하는 변수
  let sequence = 1;
  // 주의 마지막
  let weekEnd = getWeekEndAtMidnight(endOfWeek(startDate));
  // 일정이 길어져 주가 변경되는 경우 같은 일정이지만 주 기준 시작 date는 다름
  let isExistNext = endDate > weekEnd;

  /**
   * div 크기가 될 변수
   *
   * 1. 주가 변경되어도 다음 일정이 있는 경우: 주 마지막 일자 - 시작 일자(이번주 기준)
   * 2. 이번 주에 모든 일정이 끝나는 경우: 종료 일자 - 시작 일자(이번주 기준)
   * */
  let range = 1;
  if (isExistNext) {
    range = differenceInDays(weekEnd, startDate) + 1;
  } else {
    range = differenceInDays(endDate, startDate) + 1;
  }

  meetCellCardList.push({
    id: `${type}-${typeId}-${sequence}`,
    date: startDate,
    isExistPrev: false,
    range,
    typeId,
    type,
    content,
    isExistNext
  });

  if (isExistNext) {
    for (let i = addDays(weekEnd, 1); i <= endDate; i = addDays(i, 7)) {
      sequence++;
      weekEnd = getWeekEndAtMidnight(endOfWeek(i));
      isExistNext = endDate > weekEnd;
      range = 1;
      if (isExistNext) {
        range = differenceInDays(weekEnd, i) + 1;
      } else {
        range = differenceInDays(endDate, i) + 1;
      }

      meetCellCardList.push({
        id: `${type}-${typeId}-${sequence}`,
        date: i,
        isExistPrev: true,
        range,
        typeId,
        type,
        content,
        isExistNext
      });
    }
  }

  return meetCellCardList;
};

export const getMeetCardStyle = (meetCard: CellCard | undefined) => {
  if (!meetCard) return {};
  const paddingLeft = meetCard.isExistPrev ? "0px" : "8px";
  const paddingRight = meetCard.isExistNext ? "0px" : "8px";
  const style = {
    width: `calc(101% * ${meetCard.range})`,
    paddingLeft,
    paddingRight
  };

  return style;
};
