import { create } from "zustand";
// create는 store과 hook을 동시에 생성
type DropdownType = "main" | "header" | "search" | null;

interface DropdownStore {
  // 상태
  activeDropdown: DropdownType;
  // 액션
  setActiveDropdown: (type: DropdownType) => void;
  closeAllDropdowns: () => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
  //초기상태
  activeDropdown: null,
  //액션 정의
  setActiveDropdown: (type) => set({ activeDropdown: type }),
  closeAllDropdowns: () => set({ activeDropdown: null })
}));
