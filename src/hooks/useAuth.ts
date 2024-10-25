import useSWR from "swr";
import { AxiosError } from "axios";
import { login, LoginResponse } from "../services/authService";
import { useAuthStore } from "../store/AuthStore";

// Hook for managing authentication state
export const useAuth = () => {
  const {
    user,
    login: loginUserInStore,
    logout: logoutUserFromStore,
  } = useAuthStore();

  // SWR hook for login
  const { error, mutate, isValidating } = useSWR<LoginResponse, AxiosError>(
    null
  );

  // Function to initiate login
  const loginUser = async (email: string, password: string) => {
    try {
      const user = await mutate(() => login(email, password));
      if (user) {
        loginUserInStore(user);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Logout function (clearing cookies is handled by backend)
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logoutUserFromStore();
    mutate(undefined, false); // Clears the SWR state
  };

  return {
    loginResponse: user,
    isLoading: isValidating,
    isError: error,
    loginUser,
    logout,
  };
};
