import useSWR from "swr";
import {
  ItemBase,
  getItemById,
  getManyItems,
  ManyItemsResponse,
} from "../services/itemService";
import { AxiosError } from "axios";

export const useManyItems = (skip: number, limit: number) => {
  const { data, error } = useSWR<ManyItemsResponse, AxiosError>(
    skip >= 0 && limit > 0 ? `/api/item?skip=${skip}&limit=${limit}` : null,
    () => getManyItems(skip, limit)
  );

  return {
    itemList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useItem = (id: string) => {
  const { data, error } = useSWR<ItemBase, AxiosError>(
    `/api/item/${id}`,
    () => getItemById(id),
    {
      shouldRetryOnError: false,
    }
  );

  return {
    item: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseManyItemResult {
  itemList: ItemBase[] | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}
export interface UseItemResult {
  item: ItemBase | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}
