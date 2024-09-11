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
  getManyQRCodesForPrinting,
  QRCodeResponse,
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

// export const useGetManyQRCodesForPrinting = (
//   minBatch: number,
//   maxBatch: number
// ): GetManyQRCodesResult => {
//   const { data, error } = useSWR<QRCode[], AxiosError>(
//     minBatch && maxBatch
//       ? `/v1/qr_codes_for_printing?minBatch=${minBatch}&maxBatch=${maxBatch}`
//       : null,
//     () => getManyQRCodesForPrinting(minBatch, maxBatch)
//   );

//   return {
//     qrCodeList: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

export const useCreateBatchQRCodes = (
  numberOfQRCodes: number
): UseCreateBatchQRCodesResult => {
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

export type UseCreateBatchQRCodesResult = {
  createdQRCode: QRCode | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};

export const useUpdateQRCode = (
  qrCodeId: string,
  qrCodeUpdate: QRCodeUpdate
): UseUpdateQRCodeResult => {
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

export type UseUpdateQRCodeResult = {
  updatedQRCode: QRCode | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};

export const useDeleteQRCode = (qrCodeId: string): UseDeleteQRCodeResult => {
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

export type UseDeleteQRCodeResult = {
  deletedQRCode: QRCode | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
};
