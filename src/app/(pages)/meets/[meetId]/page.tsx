import { Metadata } from "next";
import React from "react";
import { getMeetDetail } from "../actions/meetDetailAction";
import MeetDetailController from "../components/meetsDetail/MeetDetailController";
import { redirect } from "next/navigation";

type Props = {
  params: {
    meetId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meetWithCamp = await getMeetDetail({ meetId: params.meetId });
  if (!meetWithCamp) {
    redirect("/");
  }

  return {
    title: meetWithCamp.camp.facltNm,
    description: meetWithCamp.camp.lineIntro
  };
}

const MeetDetail = async ({ params }: Props) => {
  const meetWithCamp = await getMeetDetail({ meetId: params.meetId });

  console.log("meetWithCamp", meetWithCamp);

  if (!meetWithCamp) {
    redirect("/");
  }

  return <MeetDetailController meetWithCamp={meetWithCamp} />;
};

export default MeetDetail;
