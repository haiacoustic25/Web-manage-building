import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from '../redux/store';

export const BASE_URL = 'http://127.0.0.1:3000/api';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      // body?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      axios.interceptors.request.use(
        (config) => {
          const access_token = store.getState().dataUser.access_token;

          if (access_token) {
            config.headers['Authorization'] = `${access_token}`;
            return config;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
