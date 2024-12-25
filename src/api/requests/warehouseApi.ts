import {
  CreateWareHousBodyType,
  GetAllWarehouseResponseType,
  UpdateWareHousBodyType,
  WarehouseType,
} from '@/types/warehuseType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/stock',
  create: '/api/v1/stock',
  update: '/api/v1/stock/',
  delete: '/api/v1/stock/',
};

export class WareHouseAPI {
  constructor(private api: BaseClient) {}

  getAll = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllWarehouseResponseType> =
      await this.api.get(urls.getAll, params);

    return result.data;
  };

  create = async (body: CreateWareHousBodyType) => {
    const result: AxiosResponse<WarehouseType> = await this.api.post(
      urls.create,
      body,
    );

    return result.data;
  };

  update = async (id: string, body: UpdateWareHousBodyType) => {
    const result: AxiosResponse<WarehouseType> = await this.api.put(
      urls.update + id,
      body,
    );

    return result.data;
  };

  delete = async (id: string) => {
    const result: AxiosResponse<WarehouseType> = await this.api.delete(
      urls.delete + id,
    );

    return result.data;
  };
}

export default new WareHouseAPI(new BaseClient());
