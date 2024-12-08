import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { ItemBase } from "./itemService";

export enum QRCodeStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type QRCodeBase = {
  id: string;
  batch_number: number;
  full_url: string;
  status: QRCodeStatus;
};

export type QRCodeBaseWithRelations = QRCodeBase & {
  item?: ItemBase;
};

export const getQRCodeById = async (
  id: string
): Promise<QRCodeBaseWithRelations> => {
  const response: AxiosResponse<QRCodeBaseWithRelations> =
    await axiosInstance.get(`/v1/qr_code/${id}`);
  return response.data;
};

export type QRCodeResponse = {
  total: number;
  qrCodes: QRCodeBaseWithRelations[];
};

export const getManyQRCodes = async (
  skip: number = 0,
  limit: number = 10
): Promise<QRCodeResponse> => {
  const response: AxiosResponse<QRCodeResponse> = await axiosInstance.get(
    "/v1/qr_code",
    {
      params: { skip, limit },
    }
  );
  return response.data;
};

export const getManyQRCodesForPrinting = async (
  minBatch: number,
  maxBatch: number
): Promise<QRCodeBaseWithRelations> => {
  const response: AxiosResponse<QRCodeBaseWithRelations> =
    await axiosInstance.get(
      `/v1/qr-codes-for-printing?min_batch_number=${minBatch}&max_batch_number=${maxBatch}`
    );
  return response.data;
};

export const createBatchQRCodes = async (
  numberOfQRCodes: number
): Promise<QRCodeBaseWithRelations> => {
  const response = await axiosInstance.post<QRCodeBaseWithRelations>(
    "/api/v1/qr_code/",
    numberOfQRCodes
  );
  return response.data;
};

export type QRCodeUpdate = {
  item_id?: string;
};

export const updateQRCode = async (
  qrCodeId: string,
  qrCodeUpdate: QRCodeUpdate
): Promise<QRCodeBaseWithRelations> => {
  const response = await axiosInstance.put<QRCodeBaseWithRelations>(
    `/api/v1/qr_code/${qrCodeId}`,
    qrCodeUpdate
  );
  return response.data;
};

export const deleteQRCode = async (
  qrCodeId: string
): Promise<QRCodeBaseWithRelations> => {
  const response = await axiosInstance.delete<QRCodeBaseWithRelations>(
    `/api/v1/qr_code/${qrCodeId}`
  );
  return response.data;
};
