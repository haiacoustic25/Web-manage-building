import { createSlice } from '@reduxjs/toolkit';
// import { login } from '../actions/authAction';
// Slice

type BuildingSliceType = {
  buildingId: string | null;
};

const initialState: BuildingSliceType = {
  buildingId: '',
};

const buildingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBuildingId: (state, action: any) => {
      state.buildingId = action.payload;
    },
  },
});

export const { setBuildingId } = buildingSlice.actions;

export default buildingSlice;
