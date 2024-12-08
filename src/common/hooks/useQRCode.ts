import useSWR from "swr";
import { AxiosError } from "axios";
import {
  createBatchQRCodes,
  deleteQRCode,
  getManyQRCodes,
  getQRCodeById,
  QRCodeBase,
  QRCodeUpdate,
  updateQRCode,
  QRCodeResponse,
} from "../services/qrCodeService";

export const useQRCodeById = (id: string) => {
  const { data, error } = useSWR<QRCodeBase, AxiosError>(
    id ? `/v1/qr_code/${id}` : null,
    () => getQRCodeById(id)
  );

  return {
    qrCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export type GetManyQRCodesResult = {
  qrCodeList: QRCodeResponse | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};

export const useGetManyQRCodes = (
  skip: number = 0,
  limit: number = 10
): GetManyQRCodesResult => {
  const { data, error } = useSWR<QRCodeResponse, AxiosError>(
    `/v1/qr_code?skip=${skip}&limit=${limit}`,
    () => getManyQRCodes(skip, limit)
  );

  return {
    qrCodeList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCreateBatchQRCodes = (
  numberOfQRCodes: number
): UseCreateBatchQRCodesResult => {
  const { data, error } = useSWR<QRCodeBase, AxiosError>(
    numberOfQRCodes ? "/api/v1/qr_code/" : null,
    () => createBatchQRCodes(numberOfQRCodes)
  );

  return {
    createdQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export type UseCreateBatchQRCodesResult = {
  createdQRCode: QRCodeBase | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};

export const useUpdateQRCode = (
  qrCodeId: string,
  qrCodeUpdate: QRCodeUpdate
): UseUpdateQRCodeResult => {
  const { data, error } = useSWR<QRCodeBase, AxiosError>(
    qrCodeId ? `/api/v1/qr_code/${qrCodeId}` : null,
    () => updateQRCode(qrCodeId, qrCodeUpdate)
  );

  return {
    updatedQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export type UseUpdateQRCodeResult = {
  updatedQRCode: QRCodeBase | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};

export const useDeleteQRCode = (qrCodeId: string): UseDeleteQRCodeResult => {
  const { data, error } = useSWR<QRCodeBase, AxiosError>(
    qrCodeId ? `/api/v1/qr_code/${qrCodeId}` : null,
    () => deleteQRCode(qrCodeId)
  );

  return {
    deletedQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export type UseDeleteQRCodeResult = {
  deletedQRCode: QRCodeBase | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};
