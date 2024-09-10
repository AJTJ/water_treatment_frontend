// import { Equipment } from "../hooks/useEquipment";
import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export enum EquipmentStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export type Equipment = {
  id: string;
  name: string;
  description?: string;
  equipment_model_number?: string;
  location?: string;
  image_url?: string;
  status: EquipmentStatus;
  created_at: Date;
  updated_at: Date;
};

export type ManyEquipmentResponse = {
  total: number;
  equipment: Equipment[];
};

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  const response: AxiosResponse<Equipment> = await axiosInstance.get(
    `/v1/equipment/${id}`
  );
  return response.data;
};

export const getManyEquipment = async (
  skip: number = 0,
  limit: number = 10
): Promise<ManyEquipmentResponse> => {
  const response: AxiosResponse<ManyEquipmentResponse> =
    await axiosInstance.get("/v1/equipment", {
      params: { skip, limit },
    });
  return response.data;
};
