import { useState } from "react";
import { AxiosError } from "axios";
import { archiveUser } from "../services/authService";

export const useArchiveUser = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleArchiveUser = async (email: string) => {
    setLoading(true);
    try {
      await archiveUser(email);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, archiveUser: handleArchiveUser };
};
