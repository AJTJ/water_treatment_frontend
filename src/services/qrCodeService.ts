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
  item_id?: string;
  item_name?: string;
};

export const getQRCodeById = async (id: string): Promise<QRCode> => {
  const response: AxiosResponse<QRCode> = await axiosInstance.get(
    `/v1/qr_code/${id}`
  );
  return response.data;
};

export type QRCodeResponse = {
  total: number;
  qrCodes: QRCode[];
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
): Promise<QRCodeResponse> => {
  const response: AxiosResponse<QRCodeResponse> = await axiosInstance.get(
    `/v1/qr-codes-for-printing?min_batch_number=${minBatch}&max_batch_number=${maxBatch}`
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
  item_id?: string;
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
