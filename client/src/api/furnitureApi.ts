import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';

export const furnitureApi = createApi({
  reducerPath: 'furnitureApi',
  tagTypes: ['Furnitures'],
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllFurniture: build.query<any, {}>({
      query: (body: any) => {
        console.log({ body });
        try {
          return {
            url: '/furniture/getAllFurniture',
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
            ...result.data.map(() => ({ type: 'Furnitures' as const })),
            { type: 'Furnitures' as const },
          ];
          return final;
        }
        // const final = [{ type: 'Furnitures' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Furnitures' }];
      },
    }),
    addFurniture: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/furniture/create',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Furnitures' }]),
    }),

    editFurniture: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/furniture/update',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Furnitures' }]),
    }),
  }),
});

export const { useGetAllFurnitureQuery, useAddFurnitureMutation, useEditFurnitureMutation } =
  furnitureApi;
