import { UserBaseWithRelations } from "common/services/authService";
import { PlantBase } from "common/services/plantService";
import { create } from "zustand";

interface AuthState {
  user: UserBaseWithRelations | null;
  login: (user: UserBaseWithRelations) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// interface PlantState {
//   plants: Record<string, PlantBase>;
//   addPlant: (plant: PlantBase) => void;
//   removePlant: (id: string) => void;
// }

// export const usePlantStore = create<PlantState>((set) => ({
//   plants: {},
//   addPlant: (plant) =>
//     set((state) => ({ plants: { ...state.plants, [plant.id]: plant } })),
//   removePlant: (id) =>
//     set((state) => {
//       const newPlants = { ...state.plants };
//       delete newPlants[id];
//       return { plants: newPlants };
//     }),
// }));
