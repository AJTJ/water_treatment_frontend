import { UUID } from "crypto";
import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export enum PlantStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type PlantResponse = {
  id: string;
  name: string;
  image_url?: string;
  location?: string;

  // Metadata
  status: PlantStatus;
  created_at: Date;
  updated_at: Date;
};

export const getPlantById = async (id: UUID): Promise<PlantResponse> => {
  const response: AxiosResponse<PlantResponse> = await axiosInstance.get(
    `/v1/item/${id}`
  );
  return response.data;
};

export const getManyPlantsById = async (
  plant_ids: UUID[]
): Promise<PlantResponse[]> => {
  const response: AxiosResponse<PlantResponse[]> = await axiosInstance.get(
    "/v1/plant/many",
    {
      params: { plant_ids: plant_ids },
    }
  );
  return response.data;
};
