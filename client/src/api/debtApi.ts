import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomError } from "../utils/helper";
import axiosBaseQuery, { BASE_URL } from "./axiosBaseQuery";
import { BuildingType } from "../types/BuildingType";

export const debtApi = createApi({
	reducerPath: "debtApi",
	tagTypes: ["Debts"],
	keepUnusedDataFor: 1,
	baseQuery: axiosBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		getAllDebt: build.query<any, {}>({
			query: (body: any) => {
				console.log({ body });
				try {
					return {
						url: "/debt/getAllDebt",
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
						...result.data.map(() => ({ type: "Debts" as const })),
						{ type: "Debts" as const },
					];
					return final;
				}
				return [{ type: "Debts" }];
			},
		}),
		findDebtByRoomId: build.query<any, any>({
			query: (params: any) => {
				try {
					return {
						url: `/debt/findDebtByRoomId/${params}`,
						method: "GET",
						// data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			providesTags(result) {
				if (result) {
					const final = [
						...result.data.map(() => ({ type: "Debts" as const })),
						{ type: "Debts" as const },
					];
					return final;
				}
				return [{ type: "Debts" }];
			},
		}),
		addDebt: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/debt/create",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Debts" }]),
		}),
		removeDebt: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/debt/delete",
						method: "DELETE",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Debts" }]),
		}),
		editDebt: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/debt/update",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
			invalidatesTags: (result, error, body) => (error ? [] : [{ type: "Debts" }]),
		}),
	}),
});

export const {
	useGetAllDebtQuery,
	useAddDebtMutation,
	useRemoveDebtMutation,
	useEditDebtMutation,
	useFindDebtByRoomIdQuery,
} = debtApi;
