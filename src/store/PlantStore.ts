import { PlantBase } from "common/services/plantService";
import { create } from "zustand";

interface PlantStore {
  plants: Record<string, PlantBase>;
  setPlants: (newPlants: Record<string, PlantBase>) => void;
  deletePlant: (id: string) => void;
}

export const usePlantStore = create<PlantStore>((set) => ({
  plants: {},

  setPlants: (newPlants) =>
    set((state) => ({
      plants: { ...state.plants, ...newPlants },
    })),

  deletePlant: (id) =>
    set((state) => {
      const { [id]: _, ...remainingPlants } = state.plants;
      return { plants: remainingPlants };
    }),
}));
