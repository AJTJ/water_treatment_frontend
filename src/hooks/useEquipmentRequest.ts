import useSWR from "swr";
import { AxiosError } from "axios";
import {
  createEquipmentRequest,
  deleteEquipmentRequest,
  EquipmentRequest,
  EquipmentRequestCreate,
  EquipmentRequestUpdate,
  getEquipmentRequestById,
  getManyEquipmentRequest,
  ManyEquipmentRequestsResponse,
  updateEquipmentRequest,
} from "../services/equipmentRequestService";

export const useEquipmentRequestByID = (id: string) => {
  const { data, error } = useSWR<EquipmentRequest, AxiosError>(
    `/api/equipment_request/${id}`,
    () => getEquipmentRequestById(id),
    {
      shouldRetryOnError: false,
    }
  );

  return {
    equipmentRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseEquipmentRequestResult {
  equipmentRequest: EquipmentRequest | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}

export const useManyEquipmentRequest = (skip: number, limit: number) => {
  const { data, error } = useSWR<ManyEquipmentRequestsResponse, AxiosError>(
    skip >= 0 && limit > 0
      ? `/api/equipment_request?skip=${skip}&limit=${limit}`
      : null,
    () => getManyEquipmentRequest(skip, limit)
  );

  return {
    equipmentRequestsResponse: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseManyEquipmentRequestResult {
  equipmentRequestList: EquipmentRequest[] | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}

export const useCreateEquipmentRequest = (
  equipmentRequestCreate: EquipmentRequestCreate
) => {
  const { data, error } = useSWR<EquipmentRequest, AxiosError>(
    "/api/equipment_request/",
    () => createEquipmentRequest(equipmentRequestCreate)
  );

  return {
    equipmentRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUpdateEquipmentRequest = (
  requestId: string,
  equipmentRequestUpdate: EquipmentRequestUpdate
) => {
  const { data, error } = useSWR<EquipmentRequest, AxiosError>(
    `/api/equipment_request/${requestId}`,
    () => updateEquipmentRequest(requestId, equipmentRequestUpdate)
  );

  return {
    equipmentRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDeleteEquipmentRequest = (requestId: string) => {
  const { data, error } = useSWR<EquipmentRequest, AxiosError>(
    `/api/equipment_request/${requestId}`,
    () => deleteEquipmentRequest(requestId)
  );

  return {
    equipmentRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};
