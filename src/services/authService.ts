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

export interface RefreshResponse {
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

export enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  SYSTEM_ADMIN = "system_admin",
  ADMIN = "admin",
  OPERATOR = "operator",
}

export interface CreateUserRequest {
  user_name: string;
  email: string;
  roles: UserRoleEnum[];
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface UserBase {
  id: string;
  user_name: string;
  email: string;
  roles: UserRoleEnum[];

  // Metadata
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  createUserRequest: CreateUserRequest
): Promise<UserBase> => {
  return await axiosInstance.post("/v1/auth/create-user", createUserRequest);
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post("/v1/auth/logout");
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
