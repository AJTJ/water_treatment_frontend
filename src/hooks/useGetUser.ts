import { useState } from "react";
import { AxiosError } from "axios";
import { getUser, GetUserRequest, UserBase } from "../services/authService";

export const useGetUser = () => {
  const [user, setUser] = useState<UserBase | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetUser = async (request: GetUserRequest) => {
    setLoading(true);
    try {
      console.log("AWAITING");
      const user = await getUser(request);
      console.log("AWAITING FINISH");
      setUser(user);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { user, error, loading, getUser: handleGetUser };
};
