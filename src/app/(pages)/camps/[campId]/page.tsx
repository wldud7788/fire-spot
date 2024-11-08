import CampDetail from "@/_components/camp/CampDetail";
import { getCampData } from "@/_utils/serverActions/campApi";
import React from "react";

type CampDetailProps = {
  params: {
    campId: string;
  };
};

const CampDetailPage = async ({ params }: CampDetailProps) => {
  const camp = await getCampData(params.campId);

  if (!camp) return <div>캠프 데이터를 찾을 수 없습니다.</div>;

  return <CampDetail camp={camp} />;
};
export default CampDetailPage;
