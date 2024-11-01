"use client";

import CampList from "@/_components/camp/CampList";
import { getTotalData } from "@/_utils/serverActions/campApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CampListProps = {
  params: {
    campPageId: string;
  };
};

const CampListPage = ({ params }: CampListProps) => {
  const {
    data: camps,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => getTotalData(),
    refetchOnMount: true // 마운트 시 재요청
  });

  console.log(params);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <div>데이터가 로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!camps || camps.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <CampList camps={camps} itemsPerPage={8} paramsId={params.campPageId} />
  );
};

export default CampListPage;
