import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomError } from "../utils/helper";
import axiosBaseQuery, { BASE_URL } from "./axiosBaseQuery";

export const historyApi = createApi({
	reducerPath: "historyApi",
	tagTypes: ["History"],
	keepUnusedDataFor: 1,
	baseQuery: axiosBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		getAllHistory: build.query<any, {}>({
			query: (body: any) => {
				console.log({ body });
				try {
					return {
						url: "/history/getAllHistory",
						method: "POST",
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
						...result.data.map(() => ({
							type: "History" as const,
						})),
						{ type: "History" as const },
					];
					return final;
				}
				// const final = [{ type: 'History' as const, id: 'LIST' }]
				// return final
				return [{ type: "History" }];
			},
		}),
		sendEmailPayment: build.mutation({
			query: (body) => {
				try {
					return {
						url: "/history/send-email-payment",
						method: "POST",
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

export const { useGetAllHistoryQuery, useSendEmailPaymentMutation } =
	historyApi;
