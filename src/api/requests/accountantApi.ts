import { GetAllAccountantData } from '@/types/accountantType';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAll: '/api/v1/accountant',
};

export class AccountantApi {
  constructor(private api: BaseClient) {}

  getAccountantData = async (parmas: {
    id: string;
    role: string;
    page: number;
    limit: number;
  }) => {
    const result: AxiosResponse<GetAllAccountantData> = await this.api.get(
      urls.getAll,
      parmas,
    );

    return result.data;
  };
}

export default new AccountantApi(new BaseClient());
