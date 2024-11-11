import { Camp } from "@/app/(pages)/camps/types/Camp";

export const fetchTotalData = async (): Promise<Camp[]> => {
  const response = await fetch("/api/campApi");
  return response.json();
};
