export const SearchSkeleton = () => (
  <div className="animate-pulse space-y-4 p-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex space-x-4">
        <div className="h-[80px] w-[100px] rounded bg-gray-200" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);
