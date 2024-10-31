import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetContentSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-44 flex flex-col gap-7">
      <section>
        <h2 className="text-4xl">모임장 한 마디</h2>
      </section>
      <section className="h-40 w-[355px] rounded-2xl bg-[#F6F6F6]">
        유저 카드
      </section>
      <section>
        <pre className="text-[#757575]">{meet.content}</pre>
      </section>
    </div>
  );
};

export default MeetContentSection;
