import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';
import { BuildingType } from '../types/BuildingType';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  tagTypes: ['Reports'],
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllReport: build.query<any, {}>({
      query: (body: any) => {
        console.log({ body });
        try {
          return {
            url: '/report/getAllReport',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi getPosts chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "Posts";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */
        if (result) {
          const final = [
            ...result.data.map(() => ({ type: 'Reports' as const })),
            { type: 'Reports' as const },
          ];
          return final;
        }
        // const final = [{ type: 'Reports' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports' }];
      },
    }),
    addReport: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/report/create',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      //   invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Buildings' }]),
    }),
    updateReport: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/report/update',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Reports' }]),
    }),
    sendEmailPayment: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/report/send-email-payment',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      // invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Reports' }]),
    }),
  }),
});
export const {
  useGetAllReportQuery,
  useAddReportMutation,
  useUpdateReportMutation,
  useSendEmailPaymentMutation,
} = reportApi;
