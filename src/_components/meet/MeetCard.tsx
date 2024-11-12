import { Meet } from "@/app/(pages)/meets/types/Meet";
import { MeetCard as IMeetCard } from "@/app/(pages)/meets/types/meet.types";
import Link from "next/link";

type MeetCardProps = {
  meetCard: IMeetCard;
};

const MeetCard = ({ meetCard }: MeetCardProps) => {
  return (
    <div className="meet_card rounded-[20px] bg-[#ffefe5] px-[30px] py-[25px]">
      <div className="inner">
        <div className="utils flex items-center justify-between">
          <ul className="flex w-full max-w-[calc(100%-40px)] flex-wrap gap-[10px]">
            {meetCard.tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="rounded-[20px] border border-[#404040] bg-[#fff] px-[12px] py-[5px] text-[12px]"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
          <div className="flex w-[40px] justify-end">
            <button type="button">
              <img
                src="/assets/images/camp/ico-camp-list-bookmark.svg"
                alt="북마크"
              />
              {/* 
                이윤지 작업 - 북마크 액티브 되면 아래의 아이콘 쓰시면 됩니다. 
                <img
                  src="/assets/images/camp/ico-camp-list-bookmark-on.svg"
                  alt="북마크"
                /> 
              */}
            </button>
          </div>
        </div>
        <Link
          href={`/meets/${meetCard.id}`}
          className="mb-[15px] mt-[15px] block text-[18px] font-bold"
        >
          {meetCard.title}
        </Link>
        <div className="info flex gap-[20px]">
          <p className="color-gray01 bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[14px]">
            {meetCard.location}
          </p>
          <p className="color-gray01 bg-date bg-left-center-0 bg-no-repeat pl-[18px] text-[14px]">
            {meetCard.date}
          </p>
          <p className="color-gray01 bg-group bg-left-center-0 bg-no-repeat pl-[18px] text-[14px]">
            {meetCard.attendee_count}/{meetCard.deadline_headcount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
