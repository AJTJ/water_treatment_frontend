import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { UserBase, UserRoleEnum } from "./authService";
import { ItemBase } from "./itemService";
import { QRCodeBase } from "./qrCodeService";

export enum PlantStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type PlantBase = {
  id: string;
  name: string;
  image_url?: string;
  location?: string;
  requests_sheet_url?: string;

  // Metadata
  status: PlantStatus;
  created_at: Date;
  updated_at: Date;
};

export type PlantBaseWithRelations = PlantBase & {
  items: ItemBase[];
  users_and_roles: UserAndRole[];
  qr_codes: QRCodeBase[];
};

export interface PlantCreateRequest {
  name: string;
  image_url?: string;
  location?: string;
  users?: UserRoleAssignment[];
}

export type UserAndRole = {
  user: UserBase;
  role: UserRoleEnum;
};

export interface UserRoleAssignment {
  user_id: string;
  role: UserRoleEnum;
}

export const getDetailedPlantById = async (
  id: string
): Promise<PlantBaseWithRelations> => {
  const response: AxiosResponse<PlantBaseWithRelations> =
    await axiosInstance.get(`/v1/plant/${id}`);
  return response.data;
};

export const createPlant = async (plantCreate: PlantCreateRequest) => {
  const response: AxiosResponse<PlantBase> = await axiosInstance.post(
    "/v1/plant/create",
    plantCreate
  );
  return response.data;
};

export const getManyPlantBasesById = async (
  plant_ids: string[]
): Promise<PlantBase[]> => {
  const response: AxiosResponse<PlantBase[]> = await axiosInstance.get(
    "/v1/plant/many",
    {
      params: { plant_ids: plant_ids },
    }
  );
  return response.data;
};

export interface SimplePlantUpdate {
  id: string;
  name: string;
  image_url?: string;
  location?: string;
  requests_sheet_url?: string;
}

export const simpleUpdatePlant = async (plantUpdate: SimplePlantUpdate) => {
  const response: AxiosResponse<PlantBaseWithRelations> =
    await axiosInstance.put(`/v1/plant/${plantUpdate.id}`, plantUpdate);
  return response.data;
};
