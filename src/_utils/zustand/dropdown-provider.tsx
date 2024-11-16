"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { create } from "zustand";

type DropdownType = "main" | "header" | "search" | "mobile" | null;

interface DropdownStore {
  activeDropdown: DropdownType;
  setActiveDropdown: (type: DropdownType) => void;
  closeAllDropdowns: () => void;
}

export type DropdownStoreApi = ReturnType<typeof createDropdownStore>;

const createDropdownStore = () => {
  return create<DropdownStore>((set) => ({
    activeDropdown: null,
    setActiveDropdown: (type) => set({ activeDropdown: type }),
    closeAllDropdowns: () => set({ activeDropdown: null })
  }));
};

export const DropdownStoreContext = createContext<DropdownStoreApi | undefined>(
  undefined
);

export interface DropdownStoreProviderProps {
  children: ReactNode;
}

export const DropdownStoreProvider = ({
  children
}: DropdownStoreProviderProps) => {
  const storeRef = useRef<DropdownStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDropdownStore();
  }
  return (
    <DropdownStoreContext.Provider value={storeRef.current}>
      {children}
    </DropdownStoreContext.Provider>
  );
};

export const useDropdownStore = <T,>(
  selector: (store: DropdownStore) => T
): T => {
  const dropdownStoreContext = useContext(DropdownStoreContext);
  if (!dropdownStoreContext) {
    throw new Error(
      `useDropdownStore must be used within DropdownStoreProvider`
    );
  }
  return useStore(dropdownStoreContext, selector);
};
