import useSWR from "swr";
import {
  getEquipmentById,
  getAllEquipment,
} from "../services/equipmentService";

export const useAllEquipment = () => {
  const { data, error } = useSWR("/api/equipment", getAllEquipment);

  return {
    equipmentList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useEquipment = (id: string) => {
  const { data, error } = useSWR(
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
