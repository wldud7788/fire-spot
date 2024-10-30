import CampList from "@/_components/camp/CampList";
import { getTotalData } from "@/_utils/serverActions/campApi";

type CampListProps = {
  params: {
    campPageId: string;
  };
};

const CampListPage = async ({ params }: CampListProps) => {
  const camps = await getTotalData();

  if (!camps) return <div>데이터가 없음</div>;

  return (
    <CampList camps={camps} itemsPerPage={8} paramsId={params.campPageId} />
  );
};

export default CampListPage;
