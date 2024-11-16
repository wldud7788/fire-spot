"use client"; // 클라이언트 컴포넌트임을 명시

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/_utils/supabase/client";
import FollowsCount from "@/_components/follower/FollowsCount";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchBookmarks,
  getFollowerData,
  getFollowingData
} from "@/_utils/service/followService";
import {
  QK_FOLLOWERS,
  QK_FOLLOWINGS
} from "@/_utils/api/queryKeys/followQueryKeys";

const UserCard: React.FC = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0); // 모임 갯수 상태
  const [meetingCount, setMeetingCount] = useState<number>(0); // 모임 갯수 상태
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [isEditingImage, setIsEditingImage] = useState(false); // 프로필 사진 수정 상태
  const [isEditingNickname, setIsEditingNickname] = useState(false); // 닉네임 수정 상태
  const supabase = createClient();

  const { data: followers, isError: isFollowersError } = useSuspenseQuery({
    queryKey: QK_FOLLOWERS(userId),
    queryFn: () => getFollowerData(userId || ""),
    staleTime: 0
  });
  const { data: followings, isError: isFollowingsError } = useSuspenseQuery({
    queryKey: QK_FOLLOWINGS(userId),
    queryFn: () => getFollowingData(userId || ""),
    staleTime: 0
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) {
        console.error("Error fetching user data:", authError);
        return;
      }

      const user = authData?.user;
      if (user) {
        setUserId(user.id);

        // 프로필 정보 가져오기
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("nickname, avatar_url")
          .eq("id", user.id)
          .single(); // 단일 항목만 가져옴

        if (profileError) {
          console.error("Error fetching profile data:", profileError);
          return;
        }

        setNickname(profileData.nickname || null);
        setProfileUrl(profileData.avatar_url || null);

        // 후기와 모임 총 갯수 가져오기
        await fetchCounts(user.id);
      }
    };

    fetchUser();
  }, [supabase]);

  // 후기 및 모임 갯수 가져오는 함수
  const fetchCounts = async (userId: string) => {
    try {
      const { count: reviewCount } = await supabase
        .from("review")
        .select("*", { count: "exact" })
        .eq("userId", userId);

      const { count: meetingCount } = await supabase
        .from("meet")
        .select("*", { count: "exact" })
        .eq("user_id", userId);

      const { count: likecount } = await supabase
        .from("bookmarks")
        .select("*", { count: "exact" })
        .eq("userId", userId);
      setLikeCount(likecount ?? 0);

      setReviewCount(reviewCount ?? 0);

      setMeetingCount(meetingCount ?? 0);
    } catch (error) {}
  };

  const handleNicknameUpdate = async () => {
    if (!newNickname || !userId) return;

    try {
      const { error } = await supabase
        .from("profile")
        .update({ nickname: newNickname })
        .eq("id", userId);

      if (error) throw error;
      setNickname(newNickname);
      setNewNickname("");
      setIsEditingNickname(false);
    } catch (error) {
      console.error("닉네임 업데이트 실패:", error);
    }
  };

  const handleProfileImageUpdate = useCallback(async () => {
    if (!profileImage || !userId) return;

    try {
      const filePath = `${userId}-${Date.now()}`;

      // 파일 업로드
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, profileImage, {
          contentType: profileImage.type
        });

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      const { data: publicURL } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      if (!publicURL || !publicURL.publicUrl) {
        console.error("Error getting public URL");
        return;
      }

      const uploadedImageUrl = publicURL.publicUrl;

      // 프로필 URL 업데이트
      const { error: updateError } = await supabase
        .from("profile")
        .update({ avatar_url: uploadedImageUrl })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating avatar_url:", updateError.message);
      } else {
        alert("프로필 이미지 업데이트 성공");
        setProfileUrl(uploadedImageUrl);
      }
    } catch (error) {
      console.error("Error handling profile image:", error);
    }
  }, [profileImage, userId, supabase]);

  if (isFollowersError) return <div>팔로워 데이터를 전달받지 못했습니다.</div>;
  if (isFollowingsError) return <div>팔로잉 데이터를 전달받지 못했습니다.</div>;

  return (
    <div className="rounded-[24Px] border border-[#bfbdbd] p-[50px] shadow-md max-989:p-[20px]">
      <div className="relative m-auto h-[100px] w-[100px] overflow-hidden rounded-[100%]">
        {profileUrl && (
          <img
            src={profileUrl}
            alt="Profile"
            className="object-fit h-full w-full"
          />
        )}
        {!isEditingImage && (
          <button
            className="absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 text-lg hover:bg-gray-300"
            onClick={() => setIsEditingImage(true)}
          >
            📷
          </button>
        )}
      </div>
      <h2 className="mb-[15px] mt-[20px] text-center text-[24px] font-bold">
        {nickname}
        {!isEditingNickname && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsEditingNickname(true)}
          >
            ✏️
          </button>
        )}
      </h2>
      <div className="follower_card">
        <FollowsCount
          followerCount={followings?.length}
          followingCount={followers?.length}
        />
      </div>
      {isEditingImage && (
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            className="block"
          />
          <button
            onClick={handleProfileImageUpdate}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            프로필 사진 저장
          </button>
          <button
            onClick={() => setIsEditingImage(false)}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            취소
          </button>
        </div>
      )}
      {isEditingNickname && (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="새 닉네임 입력"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            className="rounded-md border px-3 py-2"
          />
          <button
            onClick={handleNicknameUpdate}
            className="bg-main rounded-md px-4 py-2 text-white"
          >
            닉네임 저장
          </button>
          <button
            onClick={() => setIsEditingNickname(false)}
            className="rounded-md bg-[#d9d9d9] px-4 py-2 text-white"
          >
            취소
          </button>
        </div>
      )}
      <ul className="mt-[30px] flex items-center justify-between max-989:justify-center max-989:gap-[25px]">
        <li className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/mypage/ico-mypage-bookmark.svg"
            alt="스크랩"
            className="mb-[5px]"
          />
          <p className="text-[16px]">스크랩</p>
          <span className="text-[18px] font-bold">{likeCount}</span>
        </li>
        <li className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/mypage/ico-mypage-stamp.svg"
            alt="스탬프"
            className="mb-[5px]"
          />
          <p className="text-[16px]">스탬프</p>
          <span className="text-[18px] font-bold">{reviewCount}</span>
        </li>
        <li className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/mypage/ico-mypage-meet.svg"
            alt="모임"
            className="mb-[5px]"
          />
          <p className="text-[16px]">모임</p>
          <span className="text-[18px] font-bold">{meetingCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
