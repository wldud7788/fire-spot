"use client"; // 클라이언트 컴포넌트임을 명시

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/_utils/supabase/client";

const UserCard: React.FC = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0); // 후기 갯수 상태
  const [meetingCount, setMeetingCount] = useState<number>(0); // 모임 갯수 상태
  const supabase = createClient();

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

      setReviewCount(reviewCount ?? 0);
      setMeetingCount(meetingCount ?? 0);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
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
    } catch (error) {
      console.error("Error updating nickname:", error);
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

  return (
    <div className="max-w-sm rounded-lg border p-4 shadow-md">
      {profileUrl && (
        <img
          src={profileUrl}
          alt="Profile"
          className="mx-auto mb-4 h-24 w-24 rounded-full"
        />
      )}
      <h2 className="mb-2 text-center text-lg font-semibold">{nickname}</h2>
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
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          닉네임 수정
        </button>
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
          프로필 사진 수정
        </button>

        {/* 후기 및 모임 총 갯수 표시 */}
        <div className="mt-4 text-center">
          <p>후기 총 갯수: {reviewCount}</p>
          <p>참여한 모임 총 갯수: {meetingCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
