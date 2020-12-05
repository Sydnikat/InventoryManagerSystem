export interface IItemResponse {
  id: number;
  name: string;
  categoryId: number;
  stockPrice: number;
  sellPrice: number;
  stock: number;
}

export interface INewItemRequest {
  name: string;
  stockPrice: number;
  sellPrice: number;
  stock: number;
}

export interface IItemUpdateRequest {
  stockPrice: number;
  sellPrice: number;
  stock: number;
}

