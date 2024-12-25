import { GetAllWarehouseDashboardType } from '@/types/warehouseDashboardType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/stock/dashboard',
};

export class WarehouseDashboardAPI {
  constructor(private api: BaseClient) {}

  getDashboardData = async () => {
    const result: AxiosResponse<GetAllWarehouseDashboardType> =
      await this.api.get(urls.getAll);

    return result.data;
  };
}

export default new WarehouseDashboardAPI(new BaseClient());
