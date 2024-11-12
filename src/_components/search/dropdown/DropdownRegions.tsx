import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/_components/search/dropdown/select";
import { REGIONS } from "@/_utils/regions";

interface DropdownRegionsProps {
  onSelectRegion: (region: string) => void; // 선택된 지역을 부모로 전달하는 함수
}

const DropdownRegions: React.FC<DropdownRegionsProps> = ({
  onSelectRegion
}) => {
  const handleSelect = (region: string) => {
    onSelectRegion(region); // 선택된 지역을 부모로 전달
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="text-md button_style h-[60px] max-w-[140px] border-none py-[18px]">
        <SelectValue placeholder="지역별" />
      </SelectTrigger>
      <SelectContent className="max-h-56">
        {REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownRegions;
