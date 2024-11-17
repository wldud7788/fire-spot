import { MeetCard as IMeetCard } from "@/app/(pages)/meets/types/meet.types";
import Link from "next/link";

type MeetCardProps = {
  meetCard: IMeetCard;
};

const MeetCard = ({ meetCard }: MeetCardProps) => {
  return (
    <div className="meet_card rounded-[20px] bg-[#ffefe5] px-[30px] py-[25px] max-767:px-[20px] max-767:py-[15px]">
      <div className="inner">
        <div className="utils m flex items-center justify-between">
          <ul className="flex w-full max-w-[calc(100%-40px)] flex-wrap gap-[10px] max-767:gap-[5px]">
            {meetCard.isDeadline && (
              <li className="rounded-[20px] bg-[#D9D9D9] px-[12px] py-[5px] text-[12px] max-767:py-[3px] max-767:text-[11px]">
                마감
              </li>
            )}
            {meetCard.isDeadlineApproaching && (
              <li className="rounded-[20px] bg-[#ff924c] px-[12px] py-[5px] text-[12px] text-white max-767:py-[3px] max-767:text-[11px]">
                마감임박
              </li>
            )}
            {meetCard.tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="rounded-[20px] border border-[#404040] bg-[#fff] px-[12px] py-[5px] text-[12px] max-767:py-[3px] max-767:text-[11px]"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
          {/* <div className="flex w-[40px] justify-end">
            <button type="button">
              <img
                src="/assets/images/camp/ico-camp-list-bookmark.svg"
                alt="좋아요 버튼"
              />
            </button>
          </div> */}
        </div>
        <Link
          href={`/meets/${meetCard.id}`}
          className="mb-[15px] mt-[15px] block text-[18px] font-bold max-1280:text-[16px]"
        >
          {meetCard.title}
        </Link>
        <div className="info flex gap-[20px] max-1280:gap-[10px]">
          <p className="color-gray01 bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[14px] max-1280:text-[12px]">
            {meetCard.location}
          </p>
          <p className="color-gray01 bg-date bg-left-center-0 bg-no-repeat pl-[18px] text-[14px] max-1280:text-[12px]">
            {meetCard.date}
          </p>
          <p className="color-gray01 bg-group bg-left-center-0 bg-no-repeat pl-[18px] text-[14px] max-1280:text-[12px]">
            {meetCard.attendee_count}/{meetCard.deadline_headcount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
