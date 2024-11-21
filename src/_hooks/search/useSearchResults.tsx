import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useHighlight } from "./useHighlight";

interface SearchResultsProps {
  results: Camp[];
  validatedValue: string;
  closeDropdown: () => void;
}

export const useSearchResults = ({ validatedValue }: SearchResultsProps) => {
  const { highlightText } = useHighlight();

  const renderImage = (imageUrl: string | null) => (
    <img
      src={imageUrl || "/assets/images/camp/img-camp-default.jpg"}
      className="absolute inset-0 h-full w-full rounded-md object-cover"
      alt="캠핑 썸네일"
    />
  );

  const renderResultContent = (camp: Camp) => (
    <div className="flex w-full max-w-full flex-col">
      <h2
        className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium"
        dangerouslySetInnerHTML={{
          __html: highlightText(camp.facltNm, validatedValue)
        }}
      />
      <p
        className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600"
        dangerouslySetInnerHTML={{
          __html: highlightText(camp.doNm || "", validatedValue)
        }}
      />
    </div>
  );

  return { renderImage, renderResultContent };
};
