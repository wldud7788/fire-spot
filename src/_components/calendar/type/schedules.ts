export type Schedule = {
  // id: number;
  typeId: number;
  type: scheduleType;
  content: string;
  startDate: Date;
  endDate: Date;
};

export type CellCard = {
  id: string; // key를 위한 id (type + typeId + index ?)
  order: number; // 일정이 제일 긴 순으로 표시해줘야함
  typeId: number;
  type: scheduleType;
  content: string;
  date: Date;
  isExistPrev: boolean;
  isExistNext: boolean;
  isStartOfWeek: boolean;
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
