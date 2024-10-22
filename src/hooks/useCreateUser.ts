import { useState } from "react";
import { AxiosError } from "axios";
import {
  createUser,
  CreateUserRequest,
  UserBase,
} from "../services/authService";

export const useCreateUser = () => {
  const [user, setUser] = useState<UserBase | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (request: CreateUserRequest) => {
    setLoading(true);
    try {
      const newUser = await createUser(request);
      setUser(newUser);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { user, error, loading, createUser: handleCreateUser };
};
