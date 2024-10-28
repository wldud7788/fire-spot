import { Metadata } from "next";
import React from "react";
import { createClient } from "@/_utils/supabase/server";
import { getMeetDetail } from "../actions/meetDetailAction";
import MeetController from "./components/MeetController";

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
  const meetDetail = await getMeetDetail({ meetId: params.meetId });

  return {
    title: meetDetail.camp.facltNm,
    description: meetDetail.camp.lineIntro
  };
}

const MeetDetail = async ({ params }: Props) => {
  const meetAndCamp = await getMeetDetail({ meetId: params.meetId });
  // const recommendMeets = 어쩌구 저쩌구

  console.log("meetDetail", meetAndCamp);

  return <MeetController meetAndCamp={meetAndCamp} />;
};

export default MeetDetail;
