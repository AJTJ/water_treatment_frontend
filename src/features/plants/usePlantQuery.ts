import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDetailedPlantById } from "../../common/services/plantService";

export const usePlantQuery = (plantId: string) => {
  return useQuery({
    queryKey: ["plant", plantId], // Unique query key
    queryFn: () => getDetailedPlantById(plantId), // Fetch function
    refetchOnWindowFocus: true, // Optional: Refetch when window regains focus
    refetchOnReconnect: true, // Refetch on network reconnection
    staleTime: 0, // Always fetch fresh data
    placeholderData: keepPreviousData,
  });
};

// export const usePlantQueryWithSuccess = (plantId: string) => {
//   const setItems = useItemStore((state) => state.setItems);
//   const setPlants = usePlantStore((state) => state.setPlants);

//   return useQuery({
//     queryKey: ["plant", plantId],
//     queryFn: () => getDetailedPlantById(plantId),
//     staleTime: 0,
//     onSuccess: (data) => {
//       // const { plant, items } = normalizePlantData(data);
//       // setPlants({ [plant.id]: plant });
//       // setItems(items);
//     },
//   } as any);
// };
