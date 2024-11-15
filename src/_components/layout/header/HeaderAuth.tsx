"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getUser, signOut } from "@/_utils/auth";
import { useRouter } from "next/navigation";
import useDropdown from "@/_hooks/useDropdown";

const HeaderAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { dropdownRef, isDropdownOpen, toggleDropdown, closeDropdown } =
    useDropdown("header");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setAvatarUrl(currentUser?.user_metadata.avatar_url);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/sign-in");
  };
  if (loading) return <div className="w-[40px]"></div>;
  return (
    <>
      {!user ? (
        <Link href={"/sign-in"}>로그인</Link>
      ) : (
        <div
          className="relative inline-block h-10 w-10 cursor-pointer bg-center bg-no-repeat"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="hidden h-full w-full rounded-full object-cover lg:block"
            />
          ) : (
            <div className="h-full w-full bg-profile" />
          )}

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
      )}
    </>
  );
};

export default HeaderAuth;
