import React from "react";
import WriteButton from "./components/meets/WriteButton";
import { MeetResponse } from "./types/meet.types";
import { getMeetList } from "./actions/meetsAction";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟",
    description: "불멍스팟 모임 목록 페이지"
  };
}

const Meets = async () => {
  const meetList = await getMeetList();

  console.log("meetList", meetList);
  return (
    <div>
      <WriteButton>작성으로 가자</WriteButton>
    </div>
  );
};

export default Meets;
