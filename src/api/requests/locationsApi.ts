import { GetAllLocationsResponseType } from '@/types/locationsType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/location',
};

export class LocationsAPI {
  constructor(private api: BaseClient) {}

  getAll = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllLocationsResponseType> =
      await this.api.get(urls.getAll, params);

    return result.data;
  };
}

export default new LocationsAPI(new BaseClient());
