import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { TokenService } from '@/utils/TokenService';
import { buildParams } from './helpers';

const API_URL = import.meta.env.VITE_BASE_URI;

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    unhandled?: boolean;
  }
}

export class HTTPError extends Error {
  constructor(
    public status: number,
    public cause: string,
  ) {
    super(cause);
  }
}

export class BaseClient {
  private baseUrl = API_URL;
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });

    this.axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = TokenService.getAccessToken();
        if (token && !config.url?.includes('/auth/refresh')) {
          config.headers['Authorization'] = `${token}`;
        }
        return config;
      },
    );
    this.axios.interceptors.response.use((response: AxiosResponse) => {
      return response;
    }, this.onApiError);
  }

  private onApiError = async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (this.shouldRetryRequest(originalRequest, error.response?.status)) {
      originalRequest._retry = true;

      const success = await this.handleTokenRefresh();
      if (success) {
        const newAccessToken = TokenService.getAccessToken();
        originalRequest.headers['Authorization'] = `${newAccessToken}`;
        return this.axios(originalRequest);
      }
    }

    return Promise.reject(error);
  };

  // Tekshirishlarni alohida funksiyalarga ajratish

  private shouldRetryRequest(originalRequest: any, status?: number) {
    return originalRequest && status === 401 && !originalRequest._retry;
  }

  private async handleTokenRefresh() {
    const refreshToken = TokenService.getRefreshToken();
    const isAccessTokenExpired = TokenService.isAccessTokenExpired();

    if (refreshToken && isAccessTokenExpired) {
      return await this.refreshToken();
    }

    return false;
  }

  private refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = TokenService.getRefreshToken();
      if (refreshToken) {
        const config = {
          method: 'post',
          url: API_URL + '/auth/refresh',
          data: { refreshToken },
        };

        const response: AxiosResponse = await this.axios.request(config);
        TokenService.setTokenFromData(response.data);
        TokenService.setRefreshTokenFromData(response.data);
        return true;
      }
    } catch (error) {
      TokenService.clearTokens();
      window.location.href = '/auth/login';
    }
    return false;
  };

  setAccessToken = (token: string) => {
    const newToken = `${token}`;
    this.axios.defaults.headers.common.Authorization = newToken;

    return newToken;
  };

  get = async <T, K, C>(
    url: string,
    params?: K,
    config?: C,
  ): Promise<AxiosResponse<T>> => {
    const queryParams = params ? buildParams(params) : '';
    return this.axios.get(url + queryParams, {
      ...config,
    });
  };

  delete = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> =>
    this.axios.delete(url, { params: data });

  post = async <T, K>(
    url: string,
    data?: K,
    config?: AxiosRequestConfig<K>,
  ): Promise<AxiosResponse<T>> => this.axios.post(url, data, config);

  patch = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> =>
    this.axios.patch(url, data);

  put = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> =>
    this.axios.put(url, data);
}

export const baseApiClient = new BaseClient();
