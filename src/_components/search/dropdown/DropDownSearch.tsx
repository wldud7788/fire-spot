import { Camp } from "@/app/(pages)/camps/types/Camp";
import { RecentSearches } from "../ResentSearch";
import { SearchResult } from "../searchResult";
import { SearchSkeleton } from "../SearchSkeleton";

interface DropDownSearchProps {
  isOpen: boolean;
  closeDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  results: Camp[];
  isLoading: boolean;
  recentSearches: string[];
  onDeleteKeyword: (keyword: string) => void;
  onDeleteAll: () => void;
  validationError: string | null;
  validatedValue: string;
}

const DropDownSearch: React.FC<DropDownSearchProps> = ({
  isOpen,
  closeDropdown,
  dropdownRef,
  results,
  isLoading,
  recentSearches,
  onDeleteKeyword,
  onDeleteAll,
  validationError,
  validatedValue
}) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-0 w-full rounded-2xl border border-slate-300 bg-white p-[25px] pt-[50px] shadow-md max-767:px-0 max-767:py-4"
    >
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <div className="mt-3 max-h-[80vh] overflow-y-auto p-3">
          {validationError && (
            <div className="z-50 py-2 text-sm text-red-500">
              {validationError}
            </div>
          )}

          {/* 최근 검색어 섹션 */}
          <div className="mb-4">
            <RecentSearches
              recentSearches={recentSearches}
              onDeleteKeyword={onDeleteKeyword}
              onDeleteAll={onDeleteAll}
            />
          </div>

          {/* 검색 결과 섹션 */}
          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium text-gray-500">
                검색 결과
              </h3>
              <div className="">
                {results.map((camp) => (
                  <SearchResult
                    key={camp.contentId}
                    camp={camp}
                    validatedValue={validatedValue}
                    closeDropdown={closeDropdown}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 검색 결과 없음 메시지 */}
          {!isLoading &&
            results.length === 0 &&
            validatedValue &&
            !validationError && (
              <div className="mt-2 p-2 text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default DropDownSearch;
