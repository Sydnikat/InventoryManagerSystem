import {ICategoryResponse, INewCategoryRequest} from "../models/category";
import { axiosInstance } from "./config/axios";
import {stockServiceUrl} from "./config/url";
import { AxiosError } from "axios";
import {IItemResponse, INewItemRequest} from "../models/item";
import {handleGlobalError} from "../shared/helperFunctions";

export interface CategoriesService {
  getCategories(): Promise<ICategoryResponse[]>;
  getCategory(id: number): Promise<ICategoryResponse | null>;
  saveCategory(request: INewCategoryRequest): Promise<ICategoryResponse | null>;
  saveItem(id: number, request: INewItemRequest): Promise<IItemResponse | null>;
  deleteCategory(id: number) : Promise<boolean>;
}

const categoriesUrl = "categories";

export const categoriesService: CategoriesService = {
  async getCategories(): Promise<ICategoryResponse[]> {
    try {
      const response = await axiosInstance.get(`${stockServiceUrl}/${categoriesUrl}`);
      return response.data as ICategoryResponse[];
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return [];
    }
  },

  async getCategory(id: number): Promise<ICategoryResponse | null> {
    try {
      const response = await axiosInstance.get(`${stockServiceUrl}/${categoriesUrl}/${id}`);
      return response.data as ICategoryResponse;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return null;
    }
  },

  async saveCategory(request: INewCategoryRequest): Promise<ICategoryResponse | null> {
    try {
      const response = await axiosInstance.post(`${stockServiceUrl}/${categoriesUrl}`, request);
      return response.data as ICategoryResponse;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return null;
    }
  },

  async saveItem(id: number, request: INewItemRequest): Promise<IItemResponse | null> {
    try {
      const response = await axiosInstance.post(`${stockServiceUrl}/${categoriesUrl}/${id}/items`, request);
      return response.data as IItemResponse;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return null;
    }
  },

  async deleteCategory(id: number) : Promise<boolean> {
    try {
      await axiosInstance.delete(`${stockServiceUrl}/${categoriesUrl}/${id}`);
      return true;
    } catch (err) {
      handleGlobalError(err as AxiosError);
      return false;
    }
  },
};
