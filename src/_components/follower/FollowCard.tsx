import FollowButton from "./FollowButton";

type Profile = {
  id: string;
  avatar_url: string;
  nickname: string;
};

type FollowCardProps = {
  loginUserId: string;
  profile: Profile;
};

const FollowCard = ({ loginUserId, profile }: FollowCardProps) => {
  return (
    <div className="follow_card">
      <div className="inner">
        <div className="img_box">
          <img src={profile.avatar_url} alt="" />
        </div>
        <strong>{profile.nickname}</strong>
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

// 86716e34-ce59-4de0-baa4-4785d34d1f52
// 9264c105-e3c3-4810-9700-8751365ca233
// d2fbd9ce-fafc-4677-8f4d-2b2635050460
// c3afb6c1-7df2-4c46-afd7-e060f9df9f9f
