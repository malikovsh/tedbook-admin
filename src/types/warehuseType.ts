export interface GetAllWarehouseResponseType {
  message: string;
  data: WarehouseResponseDataType;
}

export interface WarehouseResponseDataType {
  message: string;
  total: number;
  page: number;
  totalPages: number;
  stocks: WarehouseType[];
}

export interface WarehouseType {
  _id: string;
  productId: ProductId;
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

export interface UpdateWareHousBodyType {
  quantity: number;
}

export interface CreateWareHousBodyType {
  productId: string;
  quantity: number;
}
