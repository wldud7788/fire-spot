import Link from "next/link";
import { Database } from "../../../database.types";
import FollowButton from "./FollowButton";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

type FollowCardProps = {
  loginUserId: string;
  profile: Profile;
};

const FollowCard = ({ loginUserId, profile }: FollowCardProps) => {
  return (
    <div className="follow_card">
      <div className="inner flex flex-col items-center justify-center">
        <Link
          href={`/profile/${profile.id}`}
          className="img_box h-[63px] w-[63px] overflow-hidden rounded-[100%]"
        >
          <img
            src={profile.avatar_url || ""}
            alt={`${profile.nickname} 이미지`}
            className="object-fit h-full w-full"
          />
        </Link>
        <strong className="mb-[10px] mt-[20px] text-center text-[14px] font-bold">
          {profile.nickname}
        </strong>
        <FollowButton
          loginUserId={loginUserId}
          followUserId={profile.id}
          type={"small"}
        />
      </div>
    </div>
  );
};

export default FollowCard;
