import { UserBaseWithRelations } from "common/services/authService";
import { create } from "zustand";

interface AuthState {
  user: UserBaseWithRelations | null;
  login: (user: UserBaseWithRelations) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
