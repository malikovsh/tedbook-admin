import { GetAllWarehouseReturnType } from '@/types/warehouseReturnType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/stock/orders/returning',
};

export class WarehouseReturnAPI {
  constructor(private api: BaseClient) {}

  getAll = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllWarehouseReturnType> = await this.api.get(
      urls.getAll,
      params,
    );

    return result.data;
  };
}

export default new WarehouseReturnAPI(new BaseClient());
