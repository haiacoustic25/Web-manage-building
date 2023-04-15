import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';
import { roomApi } from './roomApi';
// import { BuildingType } from '../types/BuildingType';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  tagTypes: ['Customer'],
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllCustomer: build.query<any, {}>({
      query: (body: any) => {
        try {
          return {
            url: '/customer/getAllCustomer',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.data.map(() => ({ type: 'Customer' as const })),
            { type: 'Customer' as const },
          ];
          return final;
        }
        return [{ type: 'Customer' }];
      },
    }),

    addCustomer: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/customer/create',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Customer' }]),
    }),
    removeCustomer: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/customer/remove',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Customer' }]),
    }),
    updateCustomer: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/customer/update',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Customer' }]),
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
