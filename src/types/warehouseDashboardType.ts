export interface GetAllWarehouseDashboardType {
  message: string;
  data: WarehouseDashboardType[];
}

export interface WarehouseDashboardType {
  returnedCount: number;
  pendingInCourierCount: number;
  mostUsedProduct: MostUsedProduct;
  productNamesWithQuantities: [];
}

export interface MostUsedProduct {
  productId: string;
  count: number;
  details: Details;
}

export interface Details {
  _id: string;
  title: string;
  price: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
