import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';
import { BuildingType } from '../types/BuildingType';

export const buildingApi = createApi({
  reducerPath: 'buildingApi',
  tagTypes: ['Buildings'],
  keepUnusedDataFor: 1,
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllBuilding: build.query<any, {}>({
      query: (body: any) => {
        console.log({ body });
        try {
          return {
            url: '/building/getAllBuildingsByUserId',
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
            ...result.data.map(() => ({ type: 'Buildings' as const })),
            { type: 'Buildings' as const },
          ];
          return final;
        }
        // const final = [{ type: 'Buildings' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Buildings' }];
      },
    }),
    addBuilding: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/building/create',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Buildings' }]),
    }),
    removeBuilding: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/building/delete',
            method: 'DELETE',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Buildings' }]),
    }),
    editBuilding: build.mutation({
      query: (body) => {
        try {
          return {
            url: '/building/update',
            method: 'POST',
            data: body,
          };
        } catch (error: any) {
          throw new CustomError(error.message);
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Buildings' }]),
    }),
  }),
});

export const {
  useGetAllBuildingQuery,
  useAddBuildingMutation,
  useRemoveBuildingMutation,
  useEditBuildingMutation,
} = buildingApi;
