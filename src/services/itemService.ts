import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export enum ItemStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export type Item = {
  id: string;
  name: string;
  description?: string;
  item_model_number?: string;
  location?: string;
  image_url?: string;
  status: ItemStatus;
  created_at: Date;
  updated_at: Date;
};

export type ManyItemsResponse = {
  total: number;
  items: Item[];
};

export const getItemById = async (id: string): Promise<Item> => {
  const response: AxiosResponse<Item> = await axiosInstance.get(
    `/v1/item/${id}`
  );
  return response.data;
};

export const getManyItems = async (
  skip: number = 0,
  limit: number = 10
): Promise<ManyItemsResponse> => {
  const response: AxiosResponse<ManyItemsResponse> = await axiosInstance.get(
    "/v1/item",
    {
      params: { skip, limit },
    }
  );
  return response.data;
};
