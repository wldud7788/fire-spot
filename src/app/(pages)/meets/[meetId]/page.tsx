import { Metadata } from "next";
import React from "react";
import { createClient } from "@/_utils/supabase/server";

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
  const supabase = await createClient();
  // const { data: meets } = await supabase.from("meet").select();
  const meetsWithCampsQuery = supabase.from("meet").select(`
    *,
    camp(addr1)
    `);
  const { data: meets } = await meetsWithCampsQuery;

  return {
    title: params.meetId
  };
}

const MeetDetail = async () => {
  const supabase = await createClient();
  // const { data: meets } = await supabase.from("meet").select();
  const { data: meetDetail, error } = await supabase
    .from("meet")
    .select(
      `
    *,
    camp (
      *
    )
  `
    )
    .eq("id", 1)
    .single();

  console.log("meets", meetDetail);

  return <div>MeetDetail</div>;
};

export default MeetDetail;
