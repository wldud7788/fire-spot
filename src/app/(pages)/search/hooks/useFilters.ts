import { useState, useEffect } from "react";
import { Camp } from "../../camps/types/Camp";
import { FilterState } from "../types/filters";

export const useFilters = (camps: Camp[]) => {
  const [filters, setFilters] = useState<FilterState>({
    region: "",
    petOption: "",
    facilities: [],
    campingTypes: [],
    amenities: [],
    groundTypes: []
  });

  const [filteredCamps, setFilteredCamps] = useState<Camp[]>(camps);

  useEffect(() => {
    let result = camps;

    if (filters.region && filters.region !== "전국") {
      result = result.filter((camp) => camp.doNm === filters.region);
    }

    if (filters.petOption) {
      result = result.filter((camp) => camp.animalCmgCl === filters.petOption);
    }

    if (filters.facilities.length > 0) {
      result = result.filter((camp) =>
        filters.facilities.every((facility) => camp.sbrsCl?.includes(facility))
      );
    }

    if (filters.campingTypes.length > 0) {
      result = result.filter((camp) =>
        filters.campingTypes.some((type) => camp.induty?.includes(type))
      );
    }

    if (filters.amenities.length > 0) {
      result = result.filter((camp) =>
        filters.amenities.some(
          (amenity) =>
            camp.glampInnerFclty?.includes(amenity) ||
            camp.caravInnerFclty?.includes(amenity)
        )
      );
    }

    if (filters.groundTypes.length > 0) {
      result = result.filter((camp) =>
        filters.groundTypes.some((type) => {
          const bottomTypes = {
            잔디: camp.siteBottomCl1,
            파쇄석: camp.siteBottomCl2,
            테크: camp.siteBottomCl3,
            자갈: camp.siteBottomCl4,
            맨흙: camp.siteBottomCl5
          };
          return Number(bottomTypes[type as keyof typeof bottomTypes]) > 0;
        })
      );
    }

    setFilteredCamps(result);
  }, [camps, filters]);

  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    if (!Array.isArray(filters[key])) return;

    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  return {
    filters,
    filteredCamps,
    updateFilter,
    toggleArrayFilter
  };
};
