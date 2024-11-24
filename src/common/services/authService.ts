import { useAuthStore } from "../../store/AuthStore";
import axiosInstance from "./axiosInstance";
import axios, { AxiosResponse } from "axios";
import { PlantBase } from "./plantService";

// Interfaces

interface PlantsAndRolesResponse {
  plant: PlantBase;
  role: UserRoleEnum;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserBase {
  id: string;
  user_name: string;
  email: string;
  global_role?: UserRoleEnum;
  status: UserStatus;
  created_at: string; // ISO date string or Date object if parsed
  updated_at: string; // ISO date string or Date object if parsed
}

export interface UserBaseWithRelations extends UserBase {
  plants_and_roles?: PlantsAndRolesResponse[];
}

export interface CognitoChallengeResponse {
  challenge: string;
  session: string;
  message: string;
}

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

// SERVICES

export const login = async (
  email: string,
  password: string
): Promise<UserBaseWithRelations | CognitoChallengeResponse> => {
  const response: AxiosResponse<UserBaseWithRelations> =
    await axiosInstance.post("/v1/auth/login", {
      email,
      password,
    });

  return response.data;
};

export const respondToChallenge = async (
  email: string,
  newPassword: string,
  session: string
): Promise<UserBaseWithRelations> => {
  const response: AxiosResponse<UserBaseWithRelations> =
    await axiosInstance.post("/v1/auth/respond-to-challenge", {
      email,
      new_password: newPassword,
      session,
    });

  return response.data;
};

export interface CreateUserRequest {
  user_name: string;
  email: string;
  global_role?: UserRoleEnum;
  plants_and_roles: PlantsAndRoles[];
}

export const createUser = async (
  createUserRequest: CreateUserRequest
): Promise<UserBaseWithRelations> => {
  return await axiosInstance.post("/v1/auth/create-user", createUserRequest);
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post("/v1/auth/logout");
};

export interface RefreshResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export const refreshToken = async (): Promise<RefreshResponse> => {
  const response = await axiosInstance.post<RefreshResponse>(
    "/v1/auth/refresh-token"
  );
  return response.data;
};

export async function validateSession() {
  const login = useAuthStore.getState().login; // Access Zustand store function
  const logout = useAuthStore.getState().logout;
  try {
    const response: AxiosResponse<UserBase> = await axiosInstance.get(
      "/v1/auth/me",
      { withCredentials: true }
    );
    const user = response.data; // Valid session
    login(user);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          // Retry session validation after refresh
          const retryResponse: AxiosResponse<UserBase> =
            await axiosInstance.get("/v1/auth/me", { withCredentials: true });
          const user = retryResponse.data;

          login(user);
        } catch {
          console.log("Failed to refresh session. Logging out...");
          logout();
          return null;
        }
      }
    }
    throw error; // Re-throw other errors
  }
}

export interface GetUserRequest {
  email: string;
}

export const getUser = async (
  getUserRequest: GetUserRequest
): Promise<UserBaseWithRelations> => {
  return await axiosInstance.get(`/v1/auth/user/${getUserRequest.email}`);
};

export const resetPassword = async (newPassword: string): Promise<void> => {
  await axiosInstance.post("/v1/auth/reset-password", {
    new_password: newPassword,
  });
};

export const archiveUser = async (email: string): Promise<void> => {
  await axiosInstance.post(`/v1/auth/archive-user/${email}`);
};

export const reactivateUser = async (email: string): Promise<void> => {
  console.log("reactivateUser", email);
  await axiosInstance.post(`/v1/auth/reactivate-user/${email}`);
};
