import { useSearchResults } from "@/_hooks/search/useSearchResults";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import Link from "next/link";

interface SearchResultProps {
  camp: Camp;
  validatedValue: string;
  closeDropdown: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  camp,
  validatedValue,
  closeDropdown
}) => {
  const { renderImage, renderResultContent } = useSearchResults({
    results: [camp],
    validatedValue,
    closeDropdown
  });

  return (
    <li className="list-none">
      <Link
        href={`camp-detail/${camp.contentId}`}
        onClick={closeDropdown}
        className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
      >
        <div className="h-[80px] w-[100px] shrink-0 overflow-hidden max-989:h-[60px] max-989:w-[80px]">
          <div className="relative aspect-[5/4] h-full w-full overflow-hidden">
            {renderImage(camp.firstImageUrl)}
          </div>
        </div>
        <div className="ml-4 min-w-0 flex-1 overflow-hidden">
          {renderResultContent(camp)}
        </div>
      </Link>
    </li>
  );
};
