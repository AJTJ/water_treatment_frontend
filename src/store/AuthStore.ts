import { UserLoginResponse } from "common/services/authService";
import { create } from "zustand";

interface AuthState {
  user: UserLoginResponse | null;
  login: (user: UserLoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
