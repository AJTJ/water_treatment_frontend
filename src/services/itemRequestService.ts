import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

enum ItemRequestStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type ItemRequest = {
  id: string;
  description?: string;
  employee_name?: string;
  image_url?: string;
  item_id: string;
  status: ItemRequestStatus;
  created_at: string;
  updated_at: string;
};

export const getItemRequestById = async (id: string): Promise<ItemRequest> => {
  const response: AxiosResponse<ItemRequest> = await axiosInstance.get(
    `/v1/item_request/${id}`
  );
  return response.data;
};

export type ManyItemRequestsResponse = {
  total: number;
  itemRequests: ItemRequest[];
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
): Promise<ItemRequest> => {
  const response = await axiosInstance.post<ItemRequest>(
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
): Promise<ItemRequest> => {
  const response = await axiosInstance.put<ItemRequest>(
    `/api/v1/item_request/${requestId}`,
    requestUpdate
  );
  return response.data;
};

export const deleteItemRequest = async (
  requestId: string
): Promise<ItemRequest> => {
  const response = await axiosInstance.delete<ItemRequest>(
    `/api/v1/item_request/${requestId}`
  );
  return response.data;
};
