import { GetAllDashboardResponseType } from '@/types/dashboardType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/dashboard',
};

export class DashboardAPI {
  constructor(private api: BaseClient) {}

  getDashboardData = async (params: {
    timeRange: string;
    userId: string;
    userRole: string;
    startDateString?: Date;
    endDateString?: Date;
  }) => {
    const result: AxiosResponse<GetAllDashboardResponseType> =
      await this.api.get(urls.getAll, params);

    return result.data;
  };
}

export default new DashboardAPI(new BaseClient());
