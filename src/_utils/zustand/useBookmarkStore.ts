import { create } from "zustand";

interface BookmarkStore {
  bookmarkedItems: string[]; // contentId 배열
  addBookmark: (contentId: string) => void;
  removeBookmark: (contentId: string) => void;
  setBookmarks: (contentIds: string[]) => void;
  isBookmarked: (contentId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarkedItems: [],

  addBookmark: (contentId) =>
    set((state) => ({
      bookmarkedItems: [...state.bookmarkedItems, contentId]
    })),

  removeBookmark: (contentId) =>
    set((state) => ({
      bookmarkedItems: state.bookmarkedItems.filter((id) => id !== contentId)
    })),

  setBookmarks: (contentIds) => set({ bookmarkedItems: contentIds }),

  isBookmarked: (contentId) => get().bookmarkedItems.includes(contentId)
}));
