import {
  CreateProductsBodyType,
  GetAllProductsResponseType,
  ProductsType,
  UpdateProductsBodyType,
} from '@/types/productsType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/product',
  create: '/api/v1/product',
  update: '/api/v1/product/',
  delete: '/api/v1/product/',
};

export class ProductsAPI {
  constructor(private api: BaseClient) {}

  getAll = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllProductsResponseType> =
      await this.api.get(urls.getAll, params);

    return result.data;
  };

  create = async (body: CreateProductsBodyType) => {
    const result: AxiosResponse<ProductsType> = await this.api.post(
      urls.create,
      body,
    );

    return result.data;
  };

  update = async (id: string, body: UpdateProductsBodyType) => {
    const result: AxiosResponse<ProductsType> = await this.api.put(
      urls.update + id,
      body,
    );

    return result.data;
  };

  delete = async (id: string) => {
    const result: AxiosResponse<ProductsType> = await this.api.delete(
      urls.delete + id,
    );

    return result.data;
  };
}

export default new ProductsAPI(new BaseClient());
