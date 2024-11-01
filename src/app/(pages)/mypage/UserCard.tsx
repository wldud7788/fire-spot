"use client"; // 클라이언트 컴포넌트임을 명시

import { use, useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";

// interface UserCardProps {
//   userId: string;
//   initialNickname: string;
//   initialProfileUrl: string;
// }
// 카드에서 아니라~ useeffct같은거 마이페이지 페이지에ㅔ서 불러온 다음에 유저 카드로 props 로전달
const UserCard: React.FC = () => {
  const [nickname, setNickname] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  // const user = supabase.auth.getUser
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log("데이터잘나와요?", data);
      const userId = data.user?.id ?? null;
      setUserId(userId);
      setNickname(data.user?.user_metadata.full_name);
    };
    fetchUser();
    console.log("testseteststes =-==>", userId);
    console.log("nickname", nickname);
  }, [userId]);
  // 비동기함수로 가져오기
  // 닉네임 수정 핸들러
  const handleNicknameUpdate = async () => {
    if (!newNickname) return;
    console.log(userId);
    // 로그인한 유저 정보 불러와서 // 유저의 아이디를 userId에 할당하기
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

  // 프로필 사진 수정 핸들러
  const handleProfileImageUpdate = async () => {
    console.log(supabase); // Supabase 객체가 제대로 생성되었는지 확인
    console.log(supabase.storage); // Storage 객체가 있는지 확인
    if (!profileImage) return;
    try {
      const { data, error: uploadError } = await supabase.storage
        .from("avatars") // 여기에서 'avatars' 버킷을 사용합니다
        .upload(`${userId}/${profileImage.name}`, profileImage);

      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage
        .from("avatars") // 'avatars' 버킷에서 URL 가져오기
        .getPublicUrl(data?.path || "").data.publicUrl;

      if (imageUrl) {
        const { error } = await supabase
          .from("profile")
          .update({ profile_url: imageUrl })
          .eq("id", userId);

        if (error) throw error;
        setProfileUrl(imageUrl);
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <div className="max-w-sm rounded-lg border p-4 shadow-md">
      <img
        src={profileUrl}
        alt="Profile"
        className="mx-auto mb-4 h-24 w-24 rounded-full"
      />
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
      </div>
    </div>
  );
};

export default UserCard;
