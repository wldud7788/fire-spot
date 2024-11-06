import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isTogglingRef = useRef(false);

  const toggleDropdown = () => {
    isTogglingRef.current = true;
    setIsDropdownOpen((prev) => !prev);
    // 토글 후 짧은 시간 뒤에 플래그 초기화
    setTimeout(() => {
      isTogglingRef.current = false;
    }, 100);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // 토글 중이면 외부 클릭 무시
    if (isTogglingRef.current) {
      return;
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // input 엘리먼트 클릭 시 무시
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === "input") {
        return;
      }

      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    dropdownRef
  };
};

export default useDropdown;
