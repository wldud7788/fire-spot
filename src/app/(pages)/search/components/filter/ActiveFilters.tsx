import { FilterState } from "../../types/filters";
import { FilterTag } from "./FilterTag";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: string) => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemove
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {filters.region && filters.region !== "전국" && (
        <FilterTag label={filters.region} onRemove={() => onRemove("region")} />
      )}
      {filters.petOption && (
        <FilterTag
          label={`반려동물 ${filters.petOption}`}
          onRemove={() => onRemove("petOption")}
        />
      )}
      {filters.facilities.map((facility) => (
        <FilterTag
          key={facility}
          label={facility}
          onRemove={() => onRemove("facilities", facility)}
        />
      ))}
      {filters.campingTypes.map((type) => (
        <FilterTag
          key={type}
          label={type}
          onRemove={() => onRemove("campingTypes", type)}
        />
      ))}
      {filters.amenities.map((amenity) => (
        <FilterTag
          key={amenity}
          label={amenity}
          onRemove={() => onRemove("amenities", amenity)}
        />
      ))}
      {filters.groundTypes.map((type) => (
        <FilterTag
          key={type}
          label={type}
          onRemove={() => onRemove("groundTypes", type)}
        />
      ))}
    </div>
  );
};
