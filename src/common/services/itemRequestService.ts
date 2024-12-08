import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { ItemBase } from "./itemService";
import { PartRequestBase } from "./partsService";

enum ItemRequestStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type ItemRequestBase = {
  id: string;
  description?: string;
  image_url?: string;
  requestor?: string;
  status: ItemRequestStatus;
  created_at: string;
  updated_at: string;
};

export type ItemRequestBaseWithRelations = ItemRequestBase & {
  item_id?: string;
  item?: ItemBase;
  parts?: PartRequestBase[];
};

export const getItemRequestById = async (
  id: string
): Promise<ItemRequestBase> => {
  const response: AxiosResponse<ItemRequestBase> = await axiosInstance.get(
    `/v1/item_request/${id}`
  );
  return response.data;
};

export type ManyItemRequestsResponse = {
  total: number;
  itemRequests: ItemRequestBase[];
};

export const getManyItemRequest = async (
  skip: number = 0,
  limit: number = 10
): Promise<ManyItemRequestsResponse> => {
  const response: AxiosResponse<ManyItemRequestsResponse> =
    await axiosInstance.get("/v1/item_request", {
      params: { skip, limit },
    });
  return response.data;
};

export type ItemRequestCreate = {
  description?: string;
  employee_name?: string;
  image_url?: string;
  item_id: string;
};

export const createItemRequest = async (
  itemRequestCreate: ItemRequestCreate
): Promise<ItemRequestBase> => {
  const response = await axiosInstance.post<ItemRequestBase>(
    "/api/v1/item_request/",
    itemRequestCreate
  );
  return response.data;
};

export type ItemRequestUpdate = {
  description?: string;
  employee_name?: string;
  image_url?: string;
};

export const updateItemRequest = async (
  requestId: string,
  requestUpdate: ItemRequestUpdate
): Promise<ItemRequestBase> => {
  const response = await axiosInstance.put<ItemRequestBase>(
    `/api/v1/item_request/${requestId}`,
    requestUpdate
  );
  return response.data;
};

export const deleteItemRequest = async (
  requestId: string
): Promise<ItemRequestBase> => {
  const response = await axiosInstance.delete<ItemRequestBase>(
    `/api/v1/item_request/${requestId}`
  );
  return response.data;
};
