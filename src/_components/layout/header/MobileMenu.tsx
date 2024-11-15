"use client";
import { signOut } from "@/_utils/auth";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import { useRouter } from "next/navigation";
import React from "react";
import { useDropdownStore } from "@/_utils/zustand/dropdown-provider";

interface MobileMenuProps {
  showSubmenu: boolean;
  setShowSubmenu: (showSubmenu: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  showSubmenu,
  setShowSubmenu
}) => {
  const setActiveDropdown = useDropdownStore(
    (state) => state.setActiveDropdown
  );
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      setActiveDropdown(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    router.push(path);
  };

  return (
    <nav className="absolute left-0 right-0 top-full z-50 bg-white px-5 shadow-md lg:hidden">
      <ul className="flex flex-col items-center py-6">
        <li className="w-full border-b py-4 text-center">
          <button
            className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
            onClick={handleNavigation("/beginner")}
          >
            캠핑가이드
          </button>
        </li>
        <li className="w-full border-b py-4 text-center">
          <button
            className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
            onClick={handleNavigation("/camps")}
          >
            캠핑장
          </button>
        </li>
        {/* 커뮤니티 메뉴 */}
        <li className="w-full border-b py-4 text-center">
          <button
            onClick={() => setShowSubmenu(!showSubmenu)}
            className="relative mx-auto inline-flex items-center justify-center text-[17px] font-medium text-gray-800"
          >
            커뮤니티
            <img
              src="/assets/images/common/arrow-down.svg"
              className={`absolute right-[-28px] top-1/2 h-5 w-5 -translate-y-1/2 transition-transform ${
                showSubmenu ? "rotate-180" : ""
              }`}
              alt="드롭다운 버튼"
            />
          </button>
          {showSubmenu && (
            <div className="mt-4 space-y-3">
              <button
                className="block w-full text-center text-[15px] font-medium text-gray-600"
                onClick={handleNavigation("/sos")}
              >
                SOS
              </button>
              <button
                className="block w-full text-center text-[15px] font-medium text-gray-600"
                onClick={handleNavigation(SERVER_PAGE_URL.meets)}
              >
                캠핑모임
              </button>
            </div>
          )}
        </li>
        <li className="w-full border-b py-4 text-center">
          <button
            className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
            onClick={handleNavigation("/mypage")}
          >
            마이페이지
          </button>
        </li>
        <li className="w-full py-4 text-center">
          <button
            className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
