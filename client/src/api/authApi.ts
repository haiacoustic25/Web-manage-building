import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomError } from "../utils/helper";
import axiosBaseQuery, { BASE_URL } from "./axiosBaseQuery";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: axiosBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		//   query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
		login: build.mutation({
			query: (body) => {
				try {
					console.log({ body });
					// throw Error('hehehehe')
					// let a: any = null
					// a.b = 1
					return {
						url: "/user/login",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
		}),
		register: build.mutation({
			query: (body) => {
				try {
					console.log({ body });
					// throw Error('hehehehe')
					// let a: any = null
					// a.b = 1
					return {
						url: "/user/register",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
		}),
		updateUser: build.mutation({
			query: (body) => {
				try {
					console.log({ body });
					return {
						url: "/user/update",
						method: "POST",
						data: body,
					};
				} catch (error: any) {
					throw new CustomError(error.message);
				}
			},
		}),
		changePass: build.mutation({
			query: (body) => {
				try {
					console.log({ body });
					return {
						url: "/user/changePassword",
						method: "POST",
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
	useLoginMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useChangePassMutation,
} = authApi;
