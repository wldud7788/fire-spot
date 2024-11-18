import { Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface RecentSearchesProps {
  recentSearches: string[];
  onDeleteKeyword: (keyword: string) => void;
  onDeleteAll: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onDeleteKeyword,
  onDeleteAll
}) => {
  const router = useRouter();

  if (!recentSearches || recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="recent-searches">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">최근 검색어</h3>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteAll();
          }}
          className="flex items-center text-xs text-gray-400 hover:text-gray-600"
        >
          <Trash2 className="mr-1 h-3 w-3" />
          전체삭제
        </button>
      </div>
      <div className="space-y-1">
        {recentSearches.map((keyword, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-md p-2 hover:bg-gray-100"
          >
            <button
              onClick={() => router.push(`/search?keyword=${keyword}`)}
              className="w-full cursor-pointer text-left text-sm"
            >
              {keyword}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteKeyword(keyword);
              }}
              className="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
