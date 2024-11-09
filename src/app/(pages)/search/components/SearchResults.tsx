import SearchBar from "@/_components/search/searchBar/SearchBar";
import { Camp } from "../../camps/types/Camp";
import { useMap } from "../hooks/useMap";
import { FilterState } from "../types/filters";
import { FilterSelect } from "./filter/FilterSelect";
import { FACILITIES_OPTIONS, PET_OPTIONS } from "../constants/filterOptions";
import { REGIONS } from "@/_utils/regions";
import { CampCard } from "./CampCard";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useFilters } from "../hooks/useFilters";

export interface SearchResultsProps {
  camps: Camp[];
}
export const SearchResults: React.FC<SearchResultsProps> = ({ camps }) => {
  const { filters, filteredCamps, updateFilter, toggleArrayFilter } =
    useFilters(camps);
  const { moveToMarker } = useMap(filteredCamps);

  const handleCampSelect = (selectedCamp: Camp) => {
    moveToMarker(selectedCamp);
  };

  const handleRemoveFilter = (key: keyof FilterState, value?: string) => {
    if (value) {
      toggleArrayFilter(key, value);
    } else {
      updateFilter(key, Array.isArray(filters[key]) ? [] : "");
    }
  };

  return (
    <div className="flex h-screen w-[400px] flex-col border-r">
      <div className="flex-shrink-0 border-b p-4">
        <SearchBar variant="search" />
        <div className="my-7 flex flex-wrap gap-2">
          <FilterSelect
            value={filters.region}
            options={REGIONS}
            placeholder="지역"
            onChange={(value) => updateFilter("region", value)}
          />
          <FilterSelect
            value={filters.petOption}
            options={PET_OPTIONS}
            placeholder="반려동물"
            onChange={(value) => updateFilter("petOption", value)}
          />
          <FilterSelect
            value={filters.facilities}
            options={FACILITIES_OPTIONS}
            placeholder="부대시설"
            onChange={(value) => toggleArrayFilter("facilities", value)}
            isMulti
          />
        </div>
      </div>

      <ActiveFilters filters={filters} onRemove={handleRemoveFilter} />

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
    </div>
  );
};
