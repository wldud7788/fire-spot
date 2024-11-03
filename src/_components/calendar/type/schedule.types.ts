export type Schedule = {
  // id: number;
  typeId: number | string;
  contentId: number;
  type: string;
  content: string;
  startDate: Date | string;
  endDate: Date | string;
};

export type CellCardTable = {
  [key: string]: CellCard[]; // [yyyy-MM-dd]
};

export type CellCard = {
  id: string; // key를 위한 id (type-typeId-sequence)
  range: number; // 모임 같은 경우 몇 칸을 차지하는지
  typeId: number | string;
  type: string;
  content: string;
  contentId: number;
  isExistPrev: boolean;
  isExistNext: boolean;
  date: Date | string;
  // renderDate: Date;
  isShowContent?: boolean;
};

export type MeetResponse = {
  id: number;
  start_date: Date;
  title: Date;
};

export const SCHEDULE_TYPE = {
  stamp: "stamp",
  meet: "meet"
};

export type ScheduleType = keyof typeof SCHEDULE_TYPE;
