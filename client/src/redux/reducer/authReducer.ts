import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APISTATUS } from "../../constants/ApiStatus";
import { UserType } from "../../types/UserType";
// import { login } from '../actions/authAction';
import { RootState } from "../store";
// Slice

type UserSliceType = {
	access_token: string;
	user: UserType | null;
};

const initialState: UserSliceType = {
	access_token: "",
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.access_token = "";
		},
		login: (state, action: PayloadAction<AnyAction>) => {
			state.user = action.payload.data;
			state.access_token = action.payload.token;
		},
		updateUser: (state, action: any) => {
			console.log("tesst", action.payload);
			state.user = action.payload;
		},
	},
});

export const { logout, login, updateUser } = authSlice.actions;

export default authSlice;
