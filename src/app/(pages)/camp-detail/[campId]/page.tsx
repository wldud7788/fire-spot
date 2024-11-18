import CampDetail from "@/_components/camp/CampDetail";

type CampDetailProps = {
  params: {
    campId: string;
  };
};

const CampDetailPage = ({ params }: CampDetailProps) => {
  return <CampDetail paramsId={params.campId} />;
};
export default CampDetailPage;
