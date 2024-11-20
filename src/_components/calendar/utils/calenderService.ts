import {
  addDays,
  differenceInDays,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfDay
} from "date-fns";
import { CellCard, CellCardTable, Schedule } from "../type/schedule.types";
import { ko } from "date-fns/locale";

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
  const {
    type,
    typeId,
    content,
    contentId,
    startDate: rawStartDate,
    endDate: rawEndDate
  } = schedule;

  const startDate = startOfDay(rawStartDate);
  const endDate = startOfDay(rawEndDate);

  const meetCellCardList = [] as CellCard[];

  // 같은 일정인데 일정이 길어짐에 따라 다른 줄(주)에서 다시 생성되는 일정임을 구별하는 변수
  let sequence = 1;
  // 주의 마지막
  let weekEnd = getWeekEndAtMidnight(endOfWeek(startDate, { locale: ko }));
  // 일정이 길어져 주가 변경되는 경우 같은 일정이지만 주 기준 시작 date는 다름
  let isExistNext = isAfter(endDate, weekEnd);

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
    contentId,
    range,
    typeId,
    type,
    content,
    isExistNext
  });

  if (isExistNext) {
    for (let i = addDays(weekEnd, 1); i <= endDate; i = addDays(i, 7)) {
      sequence++;
      // weekEnd = getWeekEndAtMidnight(endOfWeek(i));
      weekEnd = startOfDay(endOfWeek(i));
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
        contentId,
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
  const { isExistPrev, isExistNext, range } = meetCard;
  const isDayTrip = !isExistPrev && !isExistNext && range === 1;

  const paddingLeft = isDayTrip ? "12px" : isExistPrev ? "0px" : "32px";
  const paddingRight = isDayTrip ? "12px" : isExistNext ? "0px" : "32px";

  const width = range === 1 ? "100%" : `calc(${100 * range}% + ${range * 7}px)`;

  // const style = {
  //   width: `calc(${100 * range}% + ${range * 7}px)`,
  //   paddingLeft,
  //   paddingRight
  // };
  const style = {
    // width: `calc(${100 * range}% + ${range * 7}px)`,
    width,
    paddingLeft,
    paddingRight
  };

  return style;
};
