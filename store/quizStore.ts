// store/quizStore.ts
import { create } from "zustand";
import { Outfit } from "../types/outfit";

interface QuizStore {
  likes: Outfit[];
  dislikes: Outfit[];
  completed: boolean;

  likeOutfit: (outfit: Outfit) => void;
  dislikeOutfit: (outfit: Outfit) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  likes: [],
  dislikes: [],
  completed: false,

  likeOutfit: (outfit: Outfit) =>
    set((state) => ({
      likes: [...state.likes, outfit],
    })),

  dislikeOutfit: (outfit: Outfit) =>
    set((state) => ({
      dislikes: [...state.dislikes, outfit],
    })),

  resetQuiz: () =>
    set({
      likes: [],
      dislikes: [],
      completed: false,
    }),
}));
