import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { SupplierBase } from "./supplierService";
import { ItemRequestBase } from "./itemRequestService";

export enum ItemStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

// export type Item = {
//   id: string;
//   name: string;
//   description?: string;
//   item_model_number?: string;
//   location?: string;
//   image_url?: string;
//   status: ItemStatus;
//   created_at: Date;
//   updated_at: Date;
// };

export enum ItemTypeEnum {
  EQUIPMENT = "EQUIPMENT",
  PART = "PART",
  CONSUMABLE = "CONSUMABLE",
  TOOL = "TOOL",
}

export type ItemBase = {
  id: string;
  name: string;
  description?: string;
  item_types: ItemTypeEnum[];

  manufacturer?: string;
  item_model_number?: string;
  serial_number?: string;

  in_plant_location?: string;
  image_url?: string;
  plant_id: string;

  parts?: ItemBase[];

  status: ItemStatus;
  created_at: Date;
  updated_at: Date;
};

export type ItemBaseWithRelations = ItemBase & {
  suppliers?: SupplierBase[];
  item_requests?: ItemRequestBase[];
};

export type ManyItemsResponse = {
  total: number;
  items: ItemBase[];
};

export const getItemById = async (id: string): Promise<ItemBase> => {
  const response: AxiosResponse<ItemBase> = await axiosInstance.get(
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
