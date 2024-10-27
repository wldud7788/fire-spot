"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { getUser, signOut } from "@/_utils/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useDropdown from "@/hooks/useDropdown";

const HeaderAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { dropdownRef, isDropdownOpen, toggleDropdown, closeDropdown } =
    useDropdown();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <>
      {!user ? (
        <Link href={"/sign-in"}>로그인</Link>
      ) : (
        <div
          className="bg-profile relative inline-block h-10 w-10 bg-center bg-no-repeat"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {isDropdownOpen && (
            <div className="absolute right-0 top-10 z-10 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
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
