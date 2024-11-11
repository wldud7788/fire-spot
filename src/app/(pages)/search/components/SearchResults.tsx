import { Camp } from "../../camps/types/Camp";
import { useMap } from "../hooks/useSearchMap";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useFilters } from "../hooks/useFilters";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";

interface SearchResultsProps {
  camps: Camp[];
}
export const SearchResults: React.FC<SearchResultsProps> = ({ camps }) => {
  const {
    filters,
    filteredCamps,
    handleUpdateFilter,
    handleToggleArrayFilter,
    handleRemoveFilter
  } = useFilters(camps);

  const { moveToMarker } = useMap(filteredCamps);

  const handleCampSelect = (selectedCamp: Camp) => {
    moveToMarker(selectedCamp);
  };
  return (
    <div className="flex h-screen w-[400px] flex-col border-r">
      {/* 검색 및 필터 */}
      <SearchHeader
        filters={filters}
        handleUpdateFilter={handleUpdateFilter}
        handleToggleArrayFilter={handleToggleArrayFilter}
      />
      {/* 적용된 필터 부분 */}
      <ActiveFilters filters={filters} onRemove={handleRemoveFilter} />
      {/* 검색 결과 */}
      <SearchList
        filteredCamps={filteredCamps}
        handleCampSelect={handleCampSelect}
      />
    </div>
  );
};
