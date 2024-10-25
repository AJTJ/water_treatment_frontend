import { create } from "zustand";
import { LoginResponse } from "../services/authService";

interface AuthState {
  user: LoginResponse | null;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
