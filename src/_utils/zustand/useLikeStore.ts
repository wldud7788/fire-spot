import { create } from "zustand";

interface LikeStore {
  LikedItems: string[]; // contentId 배열
  addLike: (contentId: string) => void;
  removeLike: (contentId: string) => void;
  setLikes: (contentIds: string[]) => void;
  isLiked: (contentId: string) => boolean;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  LikedItems: [],

  addLike: (contentId) =>
    set((state) => ({
      LikedItems: [...state.LikedItems, contentId]
    })),

  removeLike: (contentId) =>
    set((state) => ({
      LikedItems: state.LikedItems.filter((id) => id !== contentId)
    })),

  setLikes: (contentIds) => set({ LikedItems: contentIds }),

  isLiked: (contentId) => get().LikedItems.includes(contentId)
}));
