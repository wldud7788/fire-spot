/**
 *
 * write할 때 camp 테이블에 데이터 upsert
 *
 * 1. 제목
 * 2. 캠핑장 선택
 * 3. 시작날짜
 * 4. 종료날짜
 * 5. 초보 가능 여부
 * 6. 모집인원
 * 7. 내용
 * 8. 준비물
 */

import MeetCreatorForm from "../components/meetsWrite/MeetCreatorForm";
import { defaultValues } from "../utils/writeFormDefaultValues";

const MeetWrite = () => {
  return <MeetCreatorForm meetWithCamp={defaultValues} />;
};

export default MeetWrite;
