import { useState, useEffect, useCallback, useMemo } from "react";

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // localStorage 접근을 메모이제이션
  const getStoredSearches = useCallback(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
    return [];
  }, []);

  // 초기 로드
  useEffect(() => {
    const storedSearches = getStoredSearches();
    console.log("Initial load:", storedSearches);
    setRecentSearches(storedSearches);
  }, [getStoredSearches]);

  // 안정적인 검색어 목록 반환
  const stableRecentSearches = useMemo(() => recentSearches, [recentSearches]);

  const saveRecentSearch = useCallback((keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    setRecentSearches((prev) => {
      const currentSearches = [...prev]; // 배열 복사
      const existingIndex = currentSearches.indexOf(trimmedKeyword);

      if (existingIndex > -1) {
        currentSearches.splice(existingIndex, 1);
      }

      const newSearches = [trimmedKeyword, ...currentSearches].slice(0, 5);
      console.log("Saving searches:", newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      return newSearches;
    });
  }, []);

  const deleteKeyword = useCallback((keywordToDelete: string) => {
    setRecentSearches((prev) => {
      const newSearches = prev.filter((keyword) => keyword !== keywordToDelete);
      console.log("After deletion:", newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      return newSearches;
    });
  }, []);

  const deleteAllKeywords = useCallback(() => {
    console.log("Deleting all keywords");
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  }, []);

  return {
    recentSearches: stableRecentSearches,
    saveRecentSearch,
    deleteKeyword,
    deleteAllKeywords
  };
}
