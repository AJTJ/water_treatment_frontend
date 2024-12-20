import {
  CognitoChallengeResponse,
  login,
  logout as logoutService,
  respondToChallenge,
} from "../services/authService";
import { useAuthStore } from "../../store/AuthStore";
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
      const userResponse = await login(email, password);

      if ("challenge" in userResponse) {
        setChallengeResponse(userResponse);
      } else {
        loginUserInStore(userResponse);
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
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorDetail = error.response.data.detail;
        const errorMessage =
          typeof errorDetail === "string"
            ? errorDetail
            : `Code: ${errorDetail.error_code}, Message: ${errorDetail.error_message}`;
        setIsError(new Error(errorMessage));
      } else {
        setIsError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function (clearing cookies is handled by backend)
  const logoutUser = async () => {
    try {
      await logoutService();
      logoutUserFromStore();
    } catch (err) {
      setIsError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginUser,
    logoutUser,
    completeNewPasswordChallenge,
    isLoading,
    isError,
    challengeResponse,
  };
};
