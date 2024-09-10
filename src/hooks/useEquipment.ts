import useSWR from "swr";
import {
  Equipment,
  getEquipmentById,
  getManyEquipment,
  ManyEquipmentResponse,
} from "../services/equipmentService";
import { AxiosError } from "axios";

// export const useEquipmentRequests = (skip: number = 0, limit: number = 10) => {
//   const { data, error } = useSWR(`/v1/equipment_request?skip=${skip}&limit=${limit}`, getManyEquipmentRequest);

//   return {
//     equipmentRequests: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

export const useManyEquipment = (skip: number, limit: number) => {
  const { data, error } = useSWR<ManyEquipmentResponse, AxiosError>(
    skip >= 0 && limit > 0
      ? `/api/equipment?skip=${skip}&limit=${limit}`
      : null,
    () => getManyEquipment(skip, limit)
  );

  return {
    equipmentList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useEquipment = (id: string) => {
  const { data, error } = useSWR<Equipment, AxiosError>(
    `/api/equipment/${id}`,
    () => getEquipmentById(id),
    {
      shouldRetryOnError: false,
    }
  );

  return {
    equipment: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseManyEquipmentResult {
  equipmentList: Equipment[] | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}
export interface UseEquipmentResult {
  equipment: Equipment | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}
