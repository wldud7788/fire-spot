import { Schedule } from "../type/schedules";

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

    [
      {
        typeId: 1,
        type: "meet",
        content:"서핑과 함께하는 바닷가 캠핑",
        date: "Wed Nov 06 2024 . . ." // 2024.11.06,
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
export const convertScheduleListToCellCardTable = (schedule: Schedule) => {};
