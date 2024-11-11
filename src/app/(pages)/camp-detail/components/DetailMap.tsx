import React from "react";
import { Camp } from "../../camps/types/Camp";
import { useCampDetailMap } from "../hooks/useCampDetilMap";

interface DetailMapProps {
  camp: Camp;
}
const DetailMap: React.FC<DetailMapProps> = ({ camp }) => {
  useCampDetailMap(camp);
  return <div id="detail-map" className="h-[400px] w-full rounded-lg"></div>;
};

export default DetailMap;
