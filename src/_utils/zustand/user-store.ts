import { createStore } from "zustand";
export type UserState = {
  isUser: boolean;
};
export type UserActions = {
  userLogin: () => void;
  userLogout: () => void;
};
export type UserStore = UserState & UserActions;
export const initUserStore = (): UserState => {
  return { isUser: false };
};
export const initUserState: UserState = {
  isUser: false,
};
export const createUserStore = (initState: UserState = initUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    userLogin: () => set(() => ({ isUser: true })),
    userLogout: () => set(() => ({ isUser: false })),
  }));
};
