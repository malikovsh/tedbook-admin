import { GetAllWarehouseHistoryType } from '@/types/warehouseHistoryType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/stock/history',
};

export class WarehouseHistoryAPI {
  constructor(private api: BaseClient) {}

  getAll = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllWarehouseHistoryType> =
      await this.api.get(urls.getAll, params);

    return result.data;
  };
}

export default new WarehouseHistoryAPI(new BaseClient());
