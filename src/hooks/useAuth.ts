import useSWR from "swr";
import { AxiosError } from "axios";
import { login, LoginResponse } from "../services/auth";

export const useLogin = (username: string, password: string) => {
  const { data, error } = useSWR<LoginResponse, AxiosError>(
    username && password ? `/api/auth/login` : null,
    () => login(username, password)
  );

  return {
    loginResponse: data,
    isLoading: !error && !data,
    isError: error,
  };
};
