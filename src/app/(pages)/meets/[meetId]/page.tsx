import { Metadata } from "next";
import React from "react";
import { getMeetDetail } from "../actions/meetDetailAction";
import MeetDetailController from "../components/meetsDetail/MeetDetailController";
import { redirect } from "next/navigation";

/**
 *
 * 1. supabase에서 meet 테이블의 데이터를 불러온 뒤, 외부 API를 불러오는 방식
 * 2. 튜터님: camp 테이블 등에 데이터를 넣어놓고, join해서 가져오기, 만약 그 데이터가 없을 시 upsert
 *    https://supabase.com/docs/reference/javascript/upsert
 */

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
  if (!meetWithCamp) {
    redirect("/");
  }

  return <MeetDetailController meetWithCamp={meetWithCamp} />;
};

export default MeetDetail;
