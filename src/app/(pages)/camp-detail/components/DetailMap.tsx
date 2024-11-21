import React from "react";
import { Camp } from "../../camps/types/Camp";
import { useCampDetailMap } from "../hooks/useCampDetilMap";

interface DetailMapProps {
  camp: Camp;
  variant?: "detail" | "meet";
}
const DetailMap: React.FC<DetailMapProps> = ({ camp, variant = "detail" }) => {
  useCampDetailMap(camp, {
    showDetailButton: variant === "meet"
  });
  return (
    <div
      id="detail-map"
      className="h-[400px] w-full rounded-lg max-989:h-[300px]"
    ></div>
  );
};

export default DetailMap;
