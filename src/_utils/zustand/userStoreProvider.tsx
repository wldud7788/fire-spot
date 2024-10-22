"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createUserStore, UserStore } from "@/_utils/zustand/user-store";

export type UserStoreApi = ReturnType<typeof createUserStore>;
export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
);
export interface UserStoreProviderProps {
  children: ReactNode;
  // isUser: boolean;
}
export const UserStoreProvider = ({
  children,
  // isUser,
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>();
  if (!storeRef.current) {
    // storeRef.current = createUserStore({ isUser: isUser });
    storeRef.current = createUserStore();
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);
  if (!userStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }
  return useStore(userStoreContext, selector);
};
