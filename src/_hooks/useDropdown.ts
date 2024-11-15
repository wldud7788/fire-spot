"use client";
import { useEffect, useRef, useState } from "react";
import { useDropdownStore } from "@/_utils/zustand/dropdown-provider";

const useDropdown = (
  dropdownType: "main" | "header" | "search" | "mobile" | null
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isTogglingRef = useRef(false);

  const activeDropdown = useDropdownStore((state) => state.activeDropdown);
  const setActiveDropdown = useDropdownStore(
    (state) => state.setActiveDropdown
  );

  const toggleDropdown = () => {
    isTogglingRef.current = true;
    const newState = !isDropdownOpen;

    if (newState) {
      setActiveDropdown(dropdownType);
      setIsDropdownOpen(true);
    } else {
      setActiveDropdown(null);
      setIsDropdownOpen(false);
    }

    setTimeout(() => {
      isTogglingRef.current = false;
    }, 100);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    if (activeDropdown === dropdownType) {
      setActiveDropdown(null);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isTogglingRef.current) {
      return;
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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

  useEffect(() => {
    if (activeDropdown && activeDropdown !== dropdownType && isDropdownOpen) {
      closeDropdown();
    }
  }, [activeDropdown]);

  return {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    dropdownRef
  };
};

export default useDropdown;
