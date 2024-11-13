import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export type UserLoginResponse = {
  id: string;
  user_name: string;
  email: string;
  global_role?: UserRoleEnum;
};

export interface CognitoChallengeResponse {
  challenge: string;
  session: string;
  message: string;
}

export interface RefreshResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export const login = async (
  email: string,
  password: string
): Promise<UserLoginResponse | CognitoChallengeResponse> => {
  const response: AxiosResponse<UserLoginResponse> = await axiosInstance.post(
    "/v1/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const respondToChallenge = async (
  email: string,
  newPassword: string,
  session: string
): Promise<UserLoginResponse> => {
  const response: AxiosResponse<UserLoginResponse> = await axiosInstance.post(
    "/v1/auth/respond-to-challenge",
    {
      email,
      new_password: newPassword,
      session,
    }
  );

  return response.data;
};

export enum UserRoleEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
}

export type PlantsAndRoles = {
  plant_id: string;
  roles: UserRoleEnum[];
};

export interface CreateUserRequest {
  user_name: string;
  email: string;
  global_role?: UserRoleEnum;
  plants_and_roles: PlantsAndRoles[];
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
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

export interface GetUserRequest {
  email: string;
}

export const getUser = async (
  getUserRequest: GetUserRequest
): Promise<UserBase> => {
  return await axiosInstance.get(`/v1/auth/user/${getUserRequest.email}`);
};

export const resetPassword = async (newPassword: string): Promise<void> => {
  await axiosInstance.post("/v1/auth/reset-password", {
    new_password: newPassword,
  });
};
