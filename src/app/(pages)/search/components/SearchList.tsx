import React from "react";
import { Camp } from "../../camps/types/Camp";
import { CampCard } from "./CampCard";

interface SearchListProps {
  filteredCamps: Camp[];
  handleCampSelect: (camp: Camp) => void;
}
const SearchList = ({ filteredCamps, handleCampSelect }: SearchListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">
          검색결과 ({filteredCamps.length})
        </h2>
        <div className="space-y-4">
          {filteredCamps.length > 0 ? (
            filteredCamps.map((camp) => (
              <CampCard
                key={camp.contentId}
                camp={camp}
                onSelect={handleCampSelect}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
