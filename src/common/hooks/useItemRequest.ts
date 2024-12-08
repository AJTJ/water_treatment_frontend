import useSWR from "swr";
import { AxiosError } from "axios";
import {
  createItemRequest,
  deleteItemRequest,
  ItemRequestBase,
  ItemRequestCreate,
  ItemRequestUpdate,
  getItemRequestById,
  getManyItemRequest,
  ManyItemRequestsResponse,
  updateItemRequest,
} from "../services/itemRequestService";

export const useItemRequestByID = (id: string) => {
  const { data, error } = useSWR<ItemRequestBase, AxiosError>(
    `/api/item_request/${id}`,
    () => getItemRequestById(id),
    {
      shouldRetryOnError: false,
    }
  );

  return {
    itemRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseItemRequestResult {
  itemRequest: ItemRequestBase | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}

export const useManyItemsRequest = (skip: number, limit: number) => {
  const { data, error } = useSWR<ManyItemRequestsResponse, AxiosError>(
    skip >= 0 && limit > 0
      ? `/api/item_request?skip=${skip}&limit=${limit}`
      : null,
    () => getManyItemRequest(skip, limit)
  );

  return {
    itemRequestsResponse: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export interface UseManyItemRequestResult {
  itemRequestList: ItemRequestBase[] | undefined;
  isLoading: boolean;
  isError: AxiosError | undefined;
}

export const useCreateItemRequest = (itemRequestCreate: ItemRequestCreate) => {
  const { data, error } = useSWR<ItemRequestBase, AxiosError>(
    "/api/item_request/",
    () => createItemRequest(itemRequestCreate)
  );

  return {
    itemRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUpdateItemRequest = (
  requestId: string,
  itemRequestUpdate: ItemRequestUpdate
) => {
  const { data, error } = useSWR<ItemRequestBase, AxiosError>(
    `/api/item_request/${requestId}`,
    () => updateItemRequest(requestId, itemRequestUpdate)
  );

  return {
    itemRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDeleteItemRequest = (requestId: string) => {
  const { data, error } = useSWR<ItemRequestBase, AxiosError>(
    `/api/item_request/${requestId}`,
    () => deleteItemRequest(requestId)
  );

  return {
    itemRequest: data,
    isLoading: !error && !data,
    isError: error,
  };
};
