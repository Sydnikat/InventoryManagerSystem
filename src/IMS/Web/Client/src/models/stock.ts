export interface ICategoryItemStockRequest {
  itemId: number;
  stockPrice: number;
  stock: number;
}

export interface IStockChangedRequest {
  userId: string;
  items: ICategoryItemStockRequest[];
}

