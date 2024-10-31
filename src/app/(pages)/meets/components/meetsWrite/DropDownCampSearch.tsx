import { Camp } from "@/app/(pages)/camps/types/Camp";
import { CampToDB } from "../../types/camp.types";

const DropDownCampSearch: React.FC<{
  handleSelectCamp: (camp: CampToDB) => void;
  camps: CampToDB[];
}> = ({ handleSelectCamp, camps }) => {
  if (!camps) return null;

  return (
    <div className="absolute top-10 w-full rounded-2xl border border-slate-300 bg-white p-[25px] pt-[50px] shadow-md">
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
