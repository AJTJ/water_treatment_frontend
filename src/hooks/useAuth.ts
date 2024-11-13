import {
  CognitoChallengeResponse,
  login,
  respondToChallenge,
} from "../services/authService";
import { useAuthStore } from "../store/AuthStore";
import { useState } from "react";

// Hook for managing authentication state
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);
  const [challengeResponse, setChallengeResponse] =
    useState<CognitoChallengeResponse | null>(null);

  const {
    // user,
    login: loginUserInStore,
    logout: logoutUserFromStore,
  } = useAuthStore();

  // Function to initiate login
  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setIsError(null);
    setChallengeResponse(null);

    try {
      const userLoginResponse = await login(email, password);

      if ("challenge" in userLoginResponse) {
        setChallengeResponse(userLoginResponse);
      } else {
        loginUserInStore(userLoginResponse);
      }
    } catch (err) {
      setIsError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeNewPasswordChallenge = async (
    email: string,
    newPassword: string
  ) => {
    if (!challengeResponse) return;

    setIsLoading(true);
    setIsError(null);

    try {
      const response = await respondToChallenge(
        email,
        newPassword,
        challengeResponse.session
      );

      loginUserInStore(response);
      setChallengeResponse(null); // Clear the challenge state
    } catch (error) {
      setIsError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function (clearing cookies is handled by backend)
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logoutUserFromStore();
  };

  return {
    loginUser,
    logout,
    completeNewPasswordChallenge,
    isLoading,
    isError,
    challengeResponse,
  };
};
