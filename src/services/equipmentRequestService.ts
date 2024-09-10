import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

enum EquipmentRequestStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export type EquipmentRequest = {
  id: string;
  description?: string;
  employee_name?: string;
  image_url?: string;
  equipment_id: string;
  status: EquipmentRequestStatus;
  created_at: string;
  updated_at: string;
};

export const getEquipmentRequestById = async (
  id: string
): Promise<EquipmentRequest> => {
  const response: AxiosResponse<EquipmentRequest> = await axiosInstance.get(
    `/v1/equipment_request/${id}`
  );
  return response.data;
};

export type ManyEquipmentRequestsResponse = {
  total: number;
  equipmentRequests: EquipmentRequest[];
};

export const getManyEquipmentRequest = async (
  skip: number = 0,
  limit: number = 10
): Promise<ManyEquipmentRequestsResponse> => {
  const response: AxiosResponse<ManyEquipmentRequestsResponse> =
    await axiosInstance.get("/v1/equipment_request", {
      params: { skip, limit },
    });
  return response.data;
};

export type EquipmentRequestCreate = {
  description?: string;
  employee_name?: string;
  image_url?: string;
  equipment_id: string;
};

export const createEquipmentRequest = async (
  equipmentRequestCreate: EquipmentRequestCreate
): Promise<EquipmentRequest> => {
  const response = await axiosInstance.post<EquipmentRequest>(
    "/api/v1/equipment_request/",
    equipmentRequestCreate
  );
  return response.data;
};

export type EquipmentRequestUpdate = {
  description?: string;
  employee_name?: string;
  image_url?: string;
};

export const updateEquipmentRequest = async (
  requestId: string,
  requestUpdate: EquipmentRequestUpdate
): Promise<EquipmentRequest> => {
  const response = await axiosInstance.put<EquipmentRequest>(
    `/api/v1/equipment_request/${requestId}`,
    requestUpdate
  );
  return response.data;
};

export const deleteEquipmentRequest = async (
  requestId: string
): Promise<EquipmentRequest> => {
  const response = await axiosInstance.delete<EquipmentRequest>(
    `/api/v1/equipment_request/${requestId}`
  );
  return response.data;
};
