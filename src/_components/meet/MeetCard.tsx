import { Meet } from "@/app/(pages)/meets/types/Meet";
import Link from "next/link";

type MeetCardProps = {
  meet: Meet;
};

const MeetCard = ({ meet }: MeetCardProps) => {
  return (
    <div className="meet_card rounded-[20px] bg-[#F4F4F4] px-[30px] py-[25px]">
      <div className="inner">
        <div className="utils flex items-center justify-between">
          <ul className="flex gap-[10px]">
            {meet.tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="rounded-[15px] bg-[#D9D9D9] px-[15px] py-[3px] text-[15px]"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
          <button type="button">북마크</button>
        </div>
        <Link
          href="#"
          className="mb-[10px] mt-[10px] block text-[30px] font-medium"
        >
          {meet.title}
        </Link>
        <div className="info flex gap-[20px]">
          <p className="bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[16px]">
            {meet.location}
          </p>
          <p className="bg-date bg-left-center-0 bg-no-repeat pl-[18px] text-[16px]">
            {meet.date}
          </p>
          <p className="bg-group bg-left-center-0 bg-no-repeat pl-[18px] text-[16px]">
            {meet.personnelCount01}/{meet.personnelCount02}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
