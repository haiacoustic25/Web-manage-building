import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  tagTypes: ['Booking'],
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllBooking: build.query<any, {}>({
      query: (body: any) => {
        console.log({ body });
        try {
          return {
            url: '/booking/getAll',
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
            ...result.data.map(() => ({ type: 'Booking' as const })),
            { type: 'Booking' as const },
          ];
          return final;
        }
        // const final = [{ type: 'Booking' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Booking' }];
      },
    }),
    addBooking: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/booking/create',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Booking' }]),
    }),

    editBooking: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/booking/update',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Booking' }]),
    }),
  }),
});

export const { useGetAllBookingQuery, useAddBookingMutation, useEditBookingMutation } = bookingApi;
