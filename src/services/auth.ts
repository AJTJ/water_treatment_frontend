import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export type LoginResponse = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
    "/v1/auth/login",
    {
      username,
      password,
    }
  );
  return response.data;
};
