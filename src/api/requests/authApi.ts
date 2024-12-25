import { BaseClient } from '@/api/baseClient';
import { LoginResponseType, LoginBodyType } from '@/types';
import { AxiosResponse } from 'axios';

const urls = {
  login: '/auth/login',
};

export class AuthAPI {
  constructor(private api: BaseClient) {}

  login = async (body: LoginBodyType) => {
    const result: AxiosResponse<LoginResponseType> = await this.api.post(
      urls.login,
      body,
    );

    return result.data;
  };
}

export default new AuthAPI(new BaseClient());
