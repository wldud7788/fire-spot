import { useRouter, useSearchParams } from "next/navigation";
import { Camp } from "../../camps/types/Camp";
import { FilterState } from "../types/filters";

export const useFilters = (camps: Camp[]) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 필터 상태 가져오기
  const filters: FilterState = {
    region: searchParams.get("region") || "",
    petOption: searchParams.get("petOption") || "",
    facilities: searchParams.getAll("facilities"),
    campingTypes: searchParams.getAll("campingTypes"),
    amenities: searchParams.getAll("amenities"),
    groundTypes: searchParams.getAll("groundTypes")
  };

  // 필터링 로직
  const filteredCamps = camps.filter((camp) => {
    if (
      filters.region &&
      filters.region !== "전국" &&
      camp.doNm !== filters.region
    )
      return false;

    if (filters.petOption && camp.animalCmgCl !== filters.petOption)
      return false;

    if (
      filters.facilities.length &&
      !filters.facilities.every((f) => camp.sbrsCl.includes(f))
    )
      return false;

    if (
      filters.campingTypes.length &&
      !filters.campingTypes.some((t) => camp.induty.includes(t))
    )
      return false;

    if (
      filters.amenities.length &&
      !filters.amenities.every((a) => camp.glampInnerFclty.includes(a))
    )
      return false;

    if (filters.groundTypes.length > 0) {
      return filters.groundTypes.every((type) => {
        const bottomTypes = {
          잔디: camp.siteBottomCl1,
          파쇄석: camp.siteBottomCl2,
          데크: camp.siteBottomCl3,
          자갈: camp.siteBottomCl4,
          맨흙: camp.siteBottomCl5
        };
        return Number(bottomTypes[type as keyof typeof bottomTypes]) > 0;
      });
    }

    return true;
  });

  const updateUrlParams = (newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      params.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v) params.append(key, v);
        });
      } else if (value) {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleUpdateFilter = (key: "region" | "petOption", value: string) => {
    const newFilters = { ...filters };
    newFilters[key] = value;
    updateUrlParams(newFilters);
  };

  const handleToggleArrayFilter = (
    key: "facilities" | "campingTypes" | "amenities" | "groundTypes",
    value: string
  ) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newFilters = { ...filters };
    newFilters[key] = newValues;
    updateUrlParams(newFilters);
  };

  const handleRemoveFilter = (key: keyof FilterState, value?: string) => {
    const newFilters = { ...filters };
    if (key === "region" || key === "petOption") {
      newFilters[key] = "";
    } else {
      if (value) {
        newFilters[key] = filters[key].filter((v) => v !== value);
      } else {
        newFilters[key] = [];
      }
    }
    updateUrlParams(newFilters);
  };

  return {
    filters,
    filteredCamps,
    handleUpdateFilter,
    handleToggleArrayFilter,
    handleRemoveFilter
  };
};
