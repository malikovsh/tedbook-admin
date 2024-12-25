import {
  CreateOrdersBodyType,
  GetAllOrdersResponseType,
  OrdersType,
} from '@/types/ordersType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/order/user/',
  getById: '/api/v1/order/',
  create: '/api/v1/order',
  update: '/api/v1/order/',
  delete: '/api/v1/order/',
};

export class OrdersAPI {
  constructor(private api: BaseClient) {}

  getAll = async (id: string, params: any) => {
    const result: AxiosResponse<GetAllOrdersResponseType> = await this.api.get(
      urls.getAll + `${id}`,
      params,
    );

    return result.data;
  };

  getById = async (id: string) => {
    const result: AxiosResponse<OrdersType> = await this.api.get(
      urls.getById + id,
    );

    return result.data;
  };

  create = async (body: CreateOrdersBodyType) => {
    const result: AxiosResponse<OrdersType> = await this.api.post(
      urls.create,
      body,
    );

    return result.data;
  };

  update = async (
    id: string,
    body: {
      courierId: string;
      status: string;
    },
  ) => {
    const result: AxiosResponse<OrdersType> = await this.api.put(
      urls.update + id,
      body,
    );

    return result.data;
  };

  delete = async (id: string) => {
    const result: AxiosResponse<OrdersType> = await this.api.delete(
      urls.delete + id,
    );

    return result.data;
  };
}

export default new OrdersAPI(new BaseClient());
