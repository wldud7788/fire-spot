import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { getSosDetail } from "../service/sosSerivce";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import SosDetailController from "../components/sosDetail/SosDetailController";

type Props = {
  params: {
    sosId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!Number(params.sosId)) {
    redirect(SERVER_PAGE_URL.sosList);
  }

  const sosWithCamp = await getSosDetail(Number(params.sosId));
  if (!sosWithCamp) {
    redirect(SERVER_PAGE_URL.sosList);
  }

  return {
    title: sosWithCamp.sos.title,
    description: sosWithCamp.sos.content
  };
}

const SosDetail = async ({ params }: Props) => {
  const sosWithCamp = await getSosDetail(Number(params.sosId));
  if (!sosWithCamp) {
    redirect(SERVER_PAGE_URL.sosList);
  }
  return <SosDetailController sosWithCamp={sosWithCamp} />;
};

export default SosDetail;
