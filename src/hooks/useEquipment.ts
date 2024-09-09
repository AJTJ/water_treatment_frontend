import useSWR from "swr";
import {
  Equipment,
  getEquipmentById,
  getManyEquipment,
} from "../services/equipmentService";
import { AxiosError } from "axios";

export const useManyEquipment = () => {
  const { data, error } = useSWR<Equipment[], AxiosError>(
    "/api/equipment",
    getManyEquipment
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
