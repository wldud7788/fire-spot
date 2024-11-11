import React from "react";
import { FilterSelect } from "./filter/FilterSelect";
import { REGIONS } from "@/_utils/regions";
import SearchBar from "@/_components/search/searchBar/SearchBar";
import {
  AMENITIES,
  CAMPING_TYPES,
  FACILITIES_OPTIONS,
  GROUND_TYPES,
  PET_OPTIONS
} from "../constants/filterOptions";
import { FilterState } from "../types/filters";

interface SearchHeaderProps {
  filters: FilterState;
  handleUpdateFilter: (key: "region" | "petOption", value: string) => void;
  handleToggleArrayFilter: (
    key: "facilities" | "campingTypes" | "amenities" | "groundTypes",
    value: string
  ) => void;
}
const SearchHeader = ({
  filters,
  handleUpdateFilter,
  handleToggleArrayFilter
}: SearchHeaderProps) => {
  return (
    <div className="flex-shrink-0 border-b p-4">
      <SearchBar variant="search" />
      <div className="my-7 flex flex-wrap gap-2">
        <FilterSelect
          value={filters.region}
          options={REGIONS}
          placeholder="지역"
          onChange={(value) => handleUpdateFilter("region", value)}
        />
        <FilterSelect
          value={filters.petOption}
          options={PET_OPTIONS}
          placeholder="반려동물"
          onChange={(value) => handleUpdateFilter("petOption", value)}
        />
        <FilterSelect
          value={filters.facilities}
          options={FACILITIES_OPTIONS}
          placeholder="부대시설"
          onChange={(value) => handleToggleArrayFilter("facilities", value)}
          isMulti
        />
        <FilterSelect
          value={filters.campingTypes}
          options={CAMPING_TYPES}
          placeholder="종류"
          onChange={(value) => handleToggleArrayFilter("campingTypes", value)}
          isMulti
        />
        <FilterSelect
          value={filters.amenities}
          options={AMENITIES}
          placeholder="편의시설"
          onChange={(value) => handleToggleArrayFilter("amenities", value)}
          isMulti
        />
        <FilterSelect
          value={filters.groundTypes}
          options={GROUND_TYPES}
          placeholder="사이트"
          onChange={(value) => handleToggleArrayFilter("groundTypes", value)}
          isMulti
        />
      </div>
    </div>
  );
};

export default SearchHeader;
