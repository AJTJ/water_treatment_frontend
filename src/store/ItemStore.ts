import { ItemBase } from "common/services/itemService";
import { create } from "zustand";

interface ItemStore {
  items: Record<string, ItemBase>;
  setItems: (newItems: Record<string, ItemBase>) => void;
  deleteItem: (id: string) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: {},

  setItems: (newItems) =>
    set((state) => ({
      items: { ...state.items, ...newItems },
    })),

  deleteItem: (id) =>
    set((state) => {
      const { [id]: _, ...remainingItems } = state.items;
      return { items: remainingItems };
    }),
}));
