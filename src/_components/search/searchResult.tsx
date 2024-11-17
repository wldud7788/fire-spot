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
    <Link href={`camp-detail/${camp.contentId}`} onClick={closeDropdown}>
      <li className="flex cursor-pointer items-center space-x-4 p-2 hover:bg-gray-100">
        <div className="h-[80px] w-[100px] max-767:h-[60px] max-767:w-[80px]">
          {renderImage(camp.firstImageUrl)}
        </div>
        {renderResultContent(camp)}
      </li>
    </Link>
  );
};
