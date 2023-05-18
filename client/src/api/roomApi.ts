import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomError } from "../utils/helper";
import axiosBaseQuery, { BASE_URL } from "./axiosBaseQuery";
// import { BuildingType } from '../types/BuildingType';

export const roomApi = createApi({
	reducerPath: "roomApi",
	tagTypes: ["Rooms"],
	keepUnusedDataFor: 1,
	baseQuery: axiosBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		getAllRoom: build.query<any, {}>({
			query: (body: any) => {
				try {
					return {
						url: "/room/getAllRoomByBuildingId",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			providesTags(result) {
				if (result) {
					const final = [
						...result.data.map(() => ({ type: "Rooms" as const })),
						{ type: "Rooms" as const },
					];
					return final;
				}

				return [{ type: "Rooms" }];
			},
		}),
		editRoom: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/room/update",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Rooms" }]),
		}),
		createRoom: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/room/create",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Rooms" }]),
		}),
		removeRoom: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/room/delete",
						method: "DELETE",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Rooms" }]),
		}),
		createCustomer: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/room/createCustomer",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Rooms" }]),
		}),
	}),
});

export const {
	useGetAllRoomQuery,
	useLazyGetAllRoomQuery,
	useEditRoomMutation,
	useCreateCustomerMutation,
	useCreateRoomMutation,
	useRemoveRoomMutation,
} = roomApi;
