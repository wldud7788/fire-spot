"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserWithProfile, signOut } from "@/_utils/auth";
import { useRouter } from "next/navigation";
import useDropdown from "@/_hooks/useDropdown";
import { UserWithProfile } from "@/_components/chat/types/Profile.types";

const HeaderAuth = () => {
  const router = useRouter();
  const [userWithProfile, setUserWithProfile] =
    useState<UserWithProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUserWithProfile();
      setUserWithProfile(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUserWithProfile(null);
    setTimeout(() => {
      router.push("/sign-in");
    });
  };

  const { dropdownRef, isDropdownOpen, toggleDropdown, closeDropdown } =
    useDropdown("header");

  if (!userWithProfile || !userWithProfile.profile || !userWithProfile.user)
    return <Link href={"/sign-in"}>로그인</Link>;
  return (
    <>
      <div
        className="relative inline-block h-10 w-10 cursor-pointer bg-center bg-no-repeat"
        ref={dropdownRef}
        onClick={toggleDropdown}
      >
        <img
          src={
            userWithProfile?.profile?.avatar_url ||
            userWithProfile?.user?.user_metadata.avatar_url ||
            "/assets/images/default_profile.jpeg"
          }
          alt="Profile"
          className="hidden h-full w-full rounded-full object-cover lg:block"
        />

        {isDropdownOpen && (
          <div className="absolute right-0 top-10 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
            <ul className="py-2">
              <li>
                <Link
                  href="/mypage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  마이페이지
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderAuth;
