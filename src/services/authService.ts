import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export type LoginResponse = {
  sub: string;
  // access_token: string;
  // id_token: string;
  // refresh_token: string;
  // token_type: string;
  // expires_in: number;
};

interface RefreshResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
    "/v1/auth/login",
    {
      email,
      password,
    }
  );
  return response.data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  const response = await axiosInstance.post<RefreshResponse>(
    "/v1/auth/refresh-token",
    {
      refresh_token: refreshToken,
    }
  );
  return response.data;
};
