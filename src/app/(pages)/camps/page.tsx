import CampList from "@/_components/camp/CampList";
import { getTotalData } from "@/_utils/serverActions/campApi";

const CampListPage = async () => {
  const camps = await getTotalData();

  if (!camps) return <div>데이터가 없음</div>;

  return <CampList camps={camps} itemsPerPage={8} />;
};

export default CampListPage;
