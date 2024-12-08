import { QRCodeBase } from "common/services/qrCodeService";
import { create } from "zustand";

interface QRCodeStore {
  qrCodes: Record<string, QRCodeBase>;
  setQRCodes: (newQRCodes: Record<string, QRCodeBase>) => void;
  deleteQRCodes: (id: string) => void;
}

export const useQRCodeStore = create<QRCodeStore>((set) => ({
  qrCodes: {},

  setQRCodes: (newQRCodes) =>
    set((state) => ({
      qrCodes: { ...state.qrCodes, ...newQRCodes },
    })),

  deleteQRCodes: (id) =>
    set((state) => {
      const { [id]: _, ...remainingQRCodes } = state.qrCodes;
      return { qrCodes: remainingQRCodes };
    }),
}));
