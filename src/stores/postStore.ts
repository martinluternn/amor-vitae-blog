import { PostModel } from "@/models";
import { create } from "zustand";

type PostStore = {
  post: PostModel | null;
  setPost: (post: PostModel) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  setPost: (post) => set({ post }),
}));
