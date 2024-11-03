"use client";

import CampList from "@/_components/camp/CampList";
import { useQuery } from "@tanstack/react-query";

type CampListProps = {
  params: {
    campPageId: string;
  };
};

const fetchTotalData = async () => {
  const response = await fetch("/api/campApi");
  return response.json();
};

const CampListPage = ({ params }: CampListProps) => {
  const {
    data: camps,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => fetchTotalData(),
    staleTime: 1000 * 60 * 60 * 24
  });

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError || !camps) return <div>에러가 발생했습니다.</div>;

  return (
    <CampList camps={camps} itemsPerPage={8} paramsId={params.campPageId} />
  );
};

export default CampListPage;
