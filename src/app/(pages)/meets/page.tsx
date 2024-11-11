import React from "react";
import { Metadata } from "next";
import MeetsList from "./components/meetsList/MeetsList";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟",
    description: "불멍스팟 모임 목록 페이지"
  };
}

const Meets = async () => <MeetsList itemsPerPage={6} />;

export default Meets;
