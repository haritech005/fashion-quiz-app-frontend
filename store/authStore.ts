// store/authStore.ts
import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

interface AuthStore {
  user: User | null;
  loading: boolean;
  session: Session | null;
  setUser: (u: User | null) => void;
  setSession: (s: Session | null) => void;
  setLoading: (v: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (u) => set({ user: u }),
  setSession: (s) => set({ session: s }),
  setLoading: (v) => set({ loading: v }),
  clear: () => set({ user: null, session: null, loading: false }),
}));
