import { useState, useCallback } from "react";
import { MIN_SEARCH_LENGTH, SPECIAL_CHARS } from "@/_utils/common/constant";

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

interface SearchState {
  searchValue: string;
  validatedValue: string;
  validationError: string | null;
  selectedRegion?: string;
}

export function useSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    searchValue: "",
    validatedValue: "",
    validationError: null,
    selectedRegion: undefined
  });

  const validateSearchTerm = useCallback((value: string): ValidationResult => {
    if (SPECIAL_CHARS.test(value)) {
      return { isValid: false, error: "특수문자는 사용할 수 없습니다." };
    }
    if (!value.trim()) {
      return { isValid: false, error: "검색어를 입력해주세요." };
    }
    if (value.length < MIN_SEARCH_LENGTH) {
      return {
        isValid: false,
        error: `검색어는 ${MIN_SEARCH_LENGTH}자 이상 입력해주세요.`
      };
    }
    return { isValid: true, error: null };
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      const validation = validateSearchTerm(value);

      setSearchState((prev) => ({
        ...prev,
        searchValue: value,
        validationError: validation.error,
        validatedValue: validation.isValid ? value : prev.validatedValue
      }));
    },
    [validateSearchTerm]
  );

  const handleRegionSelect = useCallback((region: string | null) => {
    setSearchState((prev) => ({
      ...prev,
      selectedRegion: region ?? undefined
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchState({
      searchValue: "",
      validatedValue: "",
      validationError: null,
      selectedRegion: undefined
    });
  }, []);

  return {
    searchState,
    handleSearchChange,
    handleRegionSelect,
    resetSearch,
    validateSearchTerm
  };
}
