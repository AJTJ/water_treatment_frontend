import axiosInstance from "./axiosInstance";

export const getEquipmentById = async (id: string) => {
  const response = await axiosInstance.get(`/v1/equipment/${id}`);
  return response.data;
};

export const getAllEquipment = async () => {
  const response = await axiosInstance.get("/v1/equipment");
  return response.data;
};
