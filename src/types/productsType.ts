export interface ProductsType {
  total: number;
  page: number;
  totalPages: number;
  products: object[];
}

export interface CreateProductsBodyType {
  title: string;
  comment?: string;
  price: number;
}

export interface UpdateProductsBodyType {
  title: string;
  comment?: string;
  price: number;
}

export type GetAllProductsResponseType = ProductsType;
