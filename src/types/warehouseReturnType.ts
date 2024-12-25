export interface GetAllWarehouseReturnType {
  message: string;
  data: WarehouseReturnDataType;
}

export interface WarehouseReturnDataType {
  total: number;
  page: number;
  totalPages: number;
  orders: WarehouseReturnType[];
}

export interface WarehouseReturnType {
  count: number;
  courierName: string;
  products: ProductDetail[];
}

export interface ProductDetail {
  title: string;
  quantity: number;
}
