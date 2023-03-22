import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomError } from '../utils/helper';
import axiosBaseQuery, { BASE_URL } from './axiosBaseQuery';
import { BuildingType } from '../types/BuildingType';

export const buildingApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Building'],
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    //   query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
    getAllBuilding: build.query({
      query: (body) => {
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
      // providesTags: (result: BuildingType[]) =>
      //   result
      //     ? [...result.map(({ id }) => ({ type: 'Building' as const, id })), 'Building']
      //     : ['Building'],
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
    }),
  }),
});

export const { useGetAllBuildingQuery, useAddBuildingMutation } = buildingApi;
