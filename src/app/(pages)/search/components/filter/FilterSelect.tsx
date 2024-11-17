import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@radix-ui/react-select";

interface FilterSelectProps {
  value: string | string[];
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  isMulti?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  options,
  placeholder,
  onChange,
  isMulti = false
}) => {
  const getDisplayValue = () => {
    if (Array.isArray(value) && value.length > 0) {
      return `${placeholder} (${value.length})`;
    }
    if (typeof value === "string" && value) {
      return value;
    }
    return placeholder; // 아무것도 선택되지 않았을 때 placeholder 텍스트 표시
  };

  // 다중 선택인 경우 빈 문자열을 value로 사용
  const selectValue = isMulti ? "" : (value as string);

  return (
    <Select defaultValue="" value={selectValue} onValueChange={onChange}>
      <SelectTrigger
        className={`inline-flex h-[30px] min-w-[80px] items-center justify-between gap-1 rounded-full px-3 text-sm font-medium ${
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "string" && value)
            ? "bg-main hover:bg-sub text-white"
            : "bg-main hover:bg-sub text-white"
        }`}
      >
        <span className="truncate">{getDisplayValue()}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </SelectTrigger>
      <SelectContent className="z-20 min-w-[120px] rounded-lg border bg-white p-1 shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={`rounded-md px-2 py-1.5 text-sm text-gray-900 hover:bg-blue-50 ${
              isMulti && Array.isArray(value) && value.includes(option)
                ? "bg-sub"
                : ""
            }`}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
