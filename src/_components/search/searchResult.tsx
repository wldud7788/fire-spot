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
      <li className="flex cursor-pointer space-x-4 p-2 hover:bg-gray-100">
        {renderImage(camp.firstImageUrl)}
        {renderResultContent(camp)}
      </li>
    </Link>
  );
};
