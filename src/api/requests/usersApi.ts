import {
  CreateUserBodyType,
  GetAllUsersByRoleResponseType,
  GetAllUsersResponseType,
  UpdateUserType,
  UserType,
  UserTypeById,
} from '@/types';
import { AxiosResponse } from 'axios';
import { BaseClient } from '../baseClient';

const urls = {
  getAllUsers: '/api/v1/user',
  getAllUsersByRole: '/api/v1/user?role=',
  getUserById: '/api/v1/user/',
  updateUser: '/api/v1/user/',
  createUser: '/api/v1/user',
  deleteUser: '/api/v1/user/',
};

export class UsersAPI {
  constructor(private api: BaseClient) {}

  getAllUsers = async (params: { page: number; limit: number }) => {
    const result: AxiosResponse<GetAllUsersResponseType> = await this.api.get(
      urls.getAllUsers,
      {
        role: 'all',
        ...params,
      },
    );

    return result.data;
  };

  getAllUsersByRole = async (role: string) => {
    const result: AxiosResponse<GetAllUsersByRoleResponseType> =
      await this.api.get(urls.getAllUsersByRole + role);

    return result.data;
  };

  getUserById = async (id: string) => {
    const result: AxiosResponse<UserTypeById> = await this.api.get(
      urls.getUserById + id,
    );

    return result.data;
  };

  updateUser = async (id: string, body: UpdateUserType) => {
    const result: AxiosResponse<UserType> = await this.api.put(
      urls.updateUser + id,
      body,
    );

    return result.data;
  };

  disableUser = async (id: string, body: FormData) => {
    const result: AxiosResponse<UserType> = await this.api.put(
      urls.updateUser + id,
      body,
    );

    return result.data;
  };

  updateUserProfile = async (id: string, body: FormData) => {
    const result: AxiosResponse<UserType> = await this.api.post(
      urls.updateUser + id,
      body,
    );

    return result.data;
  };

  createUser = async (body: CreateUserBodyType) => {
    const result: AxiosResponse<UserType> = await this.api.post(
      urls.createUser,
      body,
    );

    return result.data;
  };

  deleteUser = async (id: string) => {
    const result: AxiosResponse<UserType> = await this.api.delete(
      urls.deleteUser + id,
    );

    return result.data;
  };
}

export default new UsersAPI(new BaseClient());
