import useSWR from "swr";
import { AxiosError } from "axios";
import {
  createBatchQRCodes,
  deleteQRCode,
  getManyQRCodes,
  getQRCodeById,
  QRCode,
  QRCodeUpdate,
  updateQRCode,
} from "../services/qrCodeService";

export const useQRCodeById = (id: string) => {
  const { data, error } = useSWR<QRCode, AxiosError>(
    id ? `/v1/qr_code/${id}` : null,
    () => getQRCodeById(id)
  );

  return {
    qrCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useManyQRCodes = (skip: number = 0, limit: number = 10) => {
  const { data, error } = useSWR<QRCode[], AxiosError>(
    `/v1/qr_code?skip=${skip}&limit=${limit}`,
    () => getManyQRCodes(skip, limit)
  );

  return {
    qrCodeList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCreateBatchQRCodes = (numberOfQRCodes: number) => {
  const { data, error } = useSWR<QRCode, AxiosError>(
    numberOfQRCodes ? "/api/v1/qr_code/" : null,
    () => createBatchQRCodes(numberOfQRCodes)
  );

  return {
    createdQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUpdateQRCode = (
  qrCodeId: string,
  qrCodeUpdate: QRCodeUpdate
) => {
  const { data, error } = useSWR<QRCode, AxiosError>(
    qrCodeId ? `/api/v1/qr_code/${qrCodeId}` : null,
    () => updateQRCode(qrCodeId, qrCodeUpdate)
  );

  return {
    updatedQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDeleteQRCode = (qrCodeId: string) => {
  const { data, error } = useSWR<QRCode, AxiosError>(
    qrCodeId ? `/api/v1/qr_code/${qrCodeId}` : null,
    () => deleteQRCode(qrCodeId)
  );

  return {
    deletedQRCode: data,
    isLoading: !error && !data,
    isError: error,
  };
};
