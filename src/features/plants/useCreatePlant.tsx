import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createPlant,
  PlantBase,
  PlantCreateRequest,
} from "common/services/plantService";

export const useCreatePlant = () => {
  return useMutation<PlantBase, AxiosError, PlantCreateRequest>({
    mutationFn: createPlant,
    onSuccess: (data) => {
      console.log("Plant created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating plant:", error.message);
    },
  });
};
