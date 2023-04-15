import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';

export const statisticalApi = createApi({
  reducerPath: 'statisticalApi',
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getStatisticalCustomer: build.query<any, {}>({
      query: (body: any) => {
        try {
          return {
            url: '/statistical/statistical-customer',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
    }),
    getStatisticalRoom: build.query<any, {}>({
      query: (body: any) => {
        try {
          return {
            url: '/statistical/statistical-room',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
    }),
    getStatisticalGender: build.query<any, {}>({
      query: (body: any) => {
        try {
          return {
            url: '/statistical/statistical-gender',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
    }),
    getStatisticalReport: build.query<any, {}>({
      query: (body: any) => {
        try {
          return {
            url: '/statistical/statistical-report',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
    }),
  }),
});
export const {
  useGetStatisticalCustomerQuery,
  useGetStatisticalGenderQuery,
  useGetStatisticalReportQuery,
  useGetStatisticalRoomQuery,
} = statisticalApi;
