import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/_components/ui/select";
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
      <SelectTrigger className="text-md h-[60px] w-[100px] rounded-2xl border-none bg-blue-700 text-white">
        <SelectValue placeholder="지역" />
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
