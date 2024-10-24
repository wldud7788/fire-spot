export type Schedule = {
  // id: number;
  typeId: number;
  type: scheduleType;
  content: string;
  startDate: Date;
  endDate: Date;
};

export type CellCardTable = {
  [key: string]: CellCard[]; // [yyyy-MM-dd]
};

export type CellCard = {
  id: string; // key를 위한 id (type + typeId + index ?)
  range?: number; // 아니면 이거 ? 그냥 날짜 범위를 구해서 넣어버리면 되는거 아닌가?
  typeId: number;
  type: scheduleType;
  content: string;
  date: Date;
  isExistPrev: boolean;
  isExistNext: boolean;
  isShowContent: boolean;
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

export type scheduleType = keyof typeof SCHEDULE_TYPE;
