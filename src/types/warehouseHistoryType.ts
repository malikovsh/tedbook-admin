export interface GetAllWarehouseHistoryType {
  massage: string;
  data: WarehouseHistoryDataType;
}

export interface WarehouseHistoryDataType {
  total: number;
  page: number;
  totalPages: number;
  stockHistory: WarehouseHistoryType[];
}

export interface WarehouseHistoryType {
  _id: string;
  productId?: ProductId;
  changeType: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductId {
  _id: string;
  title: string;
  price: string;
  comment: string;
}
