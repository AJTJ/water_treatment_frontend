import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

export enum QRCodeStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export type QRCode = {
  id: string;
  batch_number: number;
  full_url: string;
  status: QRCodeStatus;
  equipment_id?: string;
};

export const getQRCodeById = async (id: string): Promise<QRCode> => {
  const response: AxiosResponse<QRCode> = await axiosInstance.get(
    `/v1/qr_code/${id}`
  );
  return response.data;
};

export const getManyQRCodes = async (
  skip: number = 0,
  limit: number = 10
): Promise<QRCode[]> => {
  const response: AxiosResponse<QRCode[]> = await axiosInstance.get(
    "/v1/qr_code",
    {
      params: { skip, limit },
    }
  );
  return response.data;
};

export const createBatchQRCodes = async (
  numberOfQRCodes: number
): Promise<QRCode> => {
  const response = await axiosInstance.post<QRCode>(
    "/api/v1/qr_code/",
    numberOfQRCodes
  );
  return response.data;
};

export type QRCodeUpdate = {
  equipment_id?: string;
};

export const updateQRCode = async (
  qrCodeId: string,
  qrCodeUpdate: QRCodeUpdate
): Promise<QRCode> => {
  const response = await axiosInstance.put<QRCode>(
    `/api/v1/qr_code/${qrCodeId}`,
    qrCodeUpdate
  );
  return response.data;
};

export const deleteQRCode = async (qrCodeId: string): Promise<QRCode> => {
  const response = await axiosInstance.delete<QRCode>(
    `/api/v1/qr_code/${qrCodeId}`
  );
  return response.data;
};
