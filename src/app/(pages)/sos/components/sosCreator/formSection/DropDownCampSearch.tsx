import { CampInsert } from "@/app/(pages)/meets/types/camp.types";

const DropDownCampSearch: React.FC<{
  handleSelectCamp: (camp: CampInsert) => void;
  camps: CampInsert[];
}> = ({ handleSelectCamp, camps }) => {
  if (!camps) return null;

  return (
    <div className="w-full rounded-2xl border border-slate-300 bg-white shadow-md">
      <ul className="max-h-60 overflow-y-auto">
        {camps.map((camp) => (
          <li
            key={camp.contentId}
            className="cursor-pointer p-2 hover:bg-gray-100"
            onClick={() => handleSelectCamp(camp)}
          >
            {camp.facltNm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownCampSearch;
