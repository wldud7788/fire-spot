import CampList from "@/_components/camp/CampList";

type CampListProps = {
  params: {
    campPageId: string;
  };
};

const CampListPage = ({ params }: CampListProps) => (
  <CampList itemsPerPage={8} paramsId={params.campPageId} />
);

export default CampListPage;
