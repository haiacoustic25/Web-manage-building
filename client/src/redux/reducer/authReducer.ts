import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APISTATUS } from '../../constants/ApiStatus';
import { UserType } from '../../types/UserType';
// import { login } from '../actions/authAction';
import { RootState } from '../store';
// Slice

type UserSliceType = {
  status: number;
  access_token: string;
  user: object | null;
};

const initialState: UserSliceType = {
  status: APISTATUS.NULL,
  access_token: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<AnyAction>) => {
      state.user = action.payload.data;
      state.access_token = action.payload.token;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.pending, (state) => {
  //     state.status = APISTATUS.LOADING;
  //   });
  //   builder.addCase(login.fulfilled, (state, action: PayloadAction<AnyAction>) => {
  //     state.user = action.payload.data;
  //     state.status = APISTATUS.SUCCESS;
  //     state.access_token = action.payload.token;
  //   });
  //   builder.addCase(login.rejected, (state) => {
  //     state.status = APISTATUS.ERROR;
  //   });
  // },
});

export const { logout, login } = authSlice.actions;

export default authSlice;
