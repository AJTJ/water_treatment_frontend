import useSWR from "swr";
import { AxiosError } from "axios";
import { login, LoginResponse } from "../services/authService";
import { useState } from "react";

// Hook for managing authentication state
export const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // SWR hook for login
  const { data, error, mutate } = useSWR<LoginResponse, AxiosError>(
    email && password ? "/api/auth/login" : null,
    () => login(email, password)
  );

  // Function to initiate login
  const loginUser = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    try {
      await mutate(); // Trigger login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Logout function (clearing cookies is handled by backend)
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    mutate(undefined, false); // Clears the SWR state
  };

  return {
    loginResponse: data,
    isLoading: !error && !data,
    isError: error,
    loginUser,
    logout,
  };
};
