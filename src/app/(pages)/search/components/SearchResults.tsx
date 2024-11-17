import React, { useState, useRef } from "react";
import { Camp } from "../../camps/types/Camp";
import { useMap } from "../hooks/useSearchMap";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useFilters } from "../hooks/useFilters";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
import { Map } from "./map/Map";
import { MapPin, List } from "lucide-react";

interface SearchResultsProps {
  camps: Camp[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ camps }) => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const {
    filters,
    filteredCamps,
    handleUpdateFilter,
    handleToggleArrayFilter,
    handleRemoveFilter
  } = useFilters(camps);

  const { moveToMarker, moveToMap } = useMap(filteredCamps);

  const handleCampSelect = (selectedCamp: Camp) => {
    // PC 환경 체크
    const isPC = window.innerWidth >= 768;

    if (isPC) {
      // PC에서는 바로 마커 이동
      moveToMarker(selectedCamp);
    } else {
      // 모바일에서는 transition 후 마커 이동
      setShowMap(true);

      if (mapRef.current) {
        const handleTransitionEnd = () => {
          moveToMarker(selectedCamp);
          mapRef.current?.removeEventListener(
            "transitionend",
            handleTransitionEnd
          );
        };

        mapRef.current.addEventListener("transitionend", handleTransitionEnd);
      }
    }
  };

  const handleMoveToMap = (camp: Camp) => {
    moveToMap(camp);
  };

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  return (
    <div className="relative flex h-screen w-full">
      {/* 모바일 토글 버튼 */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={toggleView}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
        >
          {showMap ? (
            <List className="h-6 w-6" />
          ) : (
            <MapPin className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 검색 결과 영역 */}
      <div
        className={`absolute h-full w-full flex-col border-r bg-white transition-transform duration-300 md:relative md:w-[700px] ${
          showMap ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        } ${showMap ? "md:flex" : "flex"}`}
      >
        <SearchHeader
          filters={filters}
          handleUpdateFilter={handleUpdateFilter}
          handleToggleArrayFilter={handleToggleArrayFilter}
        />
        <ActiveFilters filters={filters} onRemove={handleRemoveFilter} />
        <SearchList
          filteredCamps={filteredCamps}
          handleCampSelect={handleCampSelect}
          handleMoveToMap={handleMoveToMap}
        />
      </div>

      {/* 지도 영역 */}
      <div
        ref={mapRef}
        className={`absolute h-full w-full transition-transform duration-300 md:relative ${
          showMap ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } ${!showMap ? "md:flex" : "flex"}`}
      >
        <Map />
      </div>
    </div>
  );
};

export default SearchResults;
