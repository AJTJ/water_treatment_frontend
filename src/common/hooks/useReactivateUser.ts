import { useState } from "react";
import { AxiosError } from "axios";
import { reactivateUser } from "../services/authService";

export const useReactivateUser = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReactivateUser = async (email: string) => {
    setLoading(true);
    try {
      await reactivateUser(email);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, reactivateUser: handleReactivateUser };
};
