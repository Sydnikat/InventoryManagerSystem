import {IItemResponse} from "./item";

export interface ICategoryResponse {
  id: number;
  name: string;
  items: IItemResponse[];
}

export interface INewCategoryRequest {
  name: string;
}
