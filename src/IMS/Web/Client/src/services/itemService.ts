import { axiosInstance } from "./config/axios";
import {stockServiceUrl} from "./config/url";
import { AxiosError } from "axios";
import {IItemResponse, IItemUpdateRequest} from "../models/item";
import {handleGlobalError} from "../shared/helperFunctions";

export interface ItemsService {
  saveItem(itemId: number, request: IItemUpdateRequest): Promise<IItemResponse | null>;
  deleteItem(id: number) : Promise<boolean>;
}

const itemsUrl = "items";

export const itemsService: ItemsService = {
  async saveItem(itemId: number, request: IItemUpdateRequest): Promise<IItemResponse | null> {
    try {
      const response = await axiosInstance.put(`${stockServiceUrl}/${itemsUrl}/${itemId}`, request);
      return response.data as IItemResponse;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return null;
    }
  },

  async deleteItem(id: number) : Promise<boolean> {
    try {
      await axiosInstance.delete(`${stockServiceUrl}/${itemsUrl}/${id}`);
      return true;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return false;
    }
  },
};
