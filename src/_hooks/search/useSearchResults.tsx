import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useHighlight } from "./useHighlight";

interface SearchResultsProps {
  results: Camp[];
  validatedValue: string;
  closeDropdown: () => void;
}

export const useSearchResults = ({
  results,
  validatedValue,
  closeDropdown
}: SearchResultsProps) => {
  const { highlightText } = useHighlight();

  const renderImage = (imageUrl: string | null) => (
    <img
      src={imageUrl || "/assets/images/default_profile.jpeg"}
      className="h-[80px] w-[100px]"
      alt="캠핑 썸네일"
    />
  );

  const renderResultContent = (camp: Camp) => (
    <div className="flex flex-col">
      <h2
        className="overflow-hidden truncate whitespace-nowrap"
        dangerouslySetInnerHTML={{
          __html: highlightText(camp.facltNm, validatedValue)
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: highlightText(camp.doNm || "", validatedValue)
        }}
      />
    </div>
  );

  return { renderImage, renderResultContent };
};
