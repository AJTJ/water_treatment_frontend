// import { Equipment } from "../hooks/useEquipment";
import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export interface Equipment {
  id: string;
  name: string;
  description: string | null;
  equipment_model_number: string | null;
  location: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  const response: AxiosResponse<Equipment> = await axiosInstance.get(
    `/v1/equipment/${id}`
  );
  return response.data;
};

export const getManyEquipment = async (): Promise<Equipment[]> => {
  const response: AxiosResponse<Equipment[]> = await axiosInstance.get(
    "/v1/equipment"
  );
  return response.data;
};
