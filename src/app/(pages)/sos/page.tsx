import WriteButton from "@/_components/common/WriteButton";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import React from "react";
import { SosWithCamp } from "./types/sos.types";
import { getSosList } from "./service/sosSerivce";
import SosCard from "./components/sos/SosCard";
import { Metadata } from "next";
import CommunityTop from "@/_components/common/CommunityTop";
import NoData from "@/_components/common/NoData";
import SosList from "./components/sos/SosList";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟 SOS",
    description: "불멍스팟 SOS 목록 페이지"
  };
}

const Sos = async () => {
  const sosWithCampList: SosWithCamp[] = await getSosList();

  return <SosList sosWithCampList={sosWithCampList} itemsPerPage={6} />;
};

export default Sos;
