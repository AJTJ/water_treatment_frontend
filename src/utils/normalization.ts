import { ItemBase } from "common/services/itemService";
import { PlantBaseWithRelations } from "common/services/plantService";
import { QRCodeBase } from "common/services/qrCodeService";
import { useItemStore } from "store/ItemStore";
import { usePlantStore } from "store/PlantStore";
import { useQRCodeStore } from "store/QRCodeStore";

export const normalizeAndStorePlantData = (plant: PlantBaseWithRelations) => {
  const setPlants = usePlantStore.getState().setPlants;
  const setItems = useItemStore.getState().setItems;
  const setQRCodes = useQRCodeStore.getState().setQRCodes;

  const items = plant.items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, ItemBase>);

  setItems(items);

  const qrCodes = plant.qr_codes.reduce((acc, qrCode) => {
    acc[qrCode.id] = qrCode;
    return acc;
  }, {} as Record<string, QRCodeBase>);

  setQRCodes(qrCodes);

  // TODO: users_and_roles normalization

  const { items: _, qr_codes: _, ...normalizedPlant } = plant;
  setPlants({ [normalizedPlant.id]: normalizedPlant });
};
