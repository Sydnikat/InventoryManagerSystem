import {ICategoryResponse} from "../models/category";
import { axiosInstance } from "./config/axios";
import {supplyServiceUrl} from "./config/url";
import { AxiosError } from "axios";
import {handleGlobalError} from "../shared/helperFunctions";
import {IStockChangedRequest} from "../models/stock";

export interface SupplyService {
  getCategories(): Promise<ICategoryResponse[]>;
  changeStock(request: IStockChangedRequest): Promise<boolean>;
}

export const supplyService: SupplyService = {
  async getCategories(): Promise<ICategoryResponse[]> {
    try {
      const response = await axiosInstance.get(`${supplyServiceUrl}`);
      return response.data as ICategoryResponse[];
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return [];
    }
  },

  async changeStock(request: IStockChangedRequest): Promise<boolean> {
    try {
      await axiosInstance.post(`${supplyServiceUrl}`, request);
      return true;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return false;
    }
  },
};
