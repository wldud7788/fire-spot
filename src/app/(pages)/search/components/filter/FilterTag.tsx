interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export const FilterTag: React.FC<FilterTagProps> = ({ label, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-blue-200"
      >
        <svg
          className="h-3 w-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
};
