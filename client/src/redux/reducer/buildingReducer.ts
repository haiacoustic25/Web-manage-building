import { createSlice } from '@reduxjs/toolkit';
// import { login } from '../actions/authAction';
// Slice

type BuildingSliceType = {
  buildingId: string | null;
  numberOfFloors: number;
};

const initialState: BuildingSliceType = {
  buildingId: '',
  numberOfFloors: 0,
};

const buildingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBuildingId: (state, action: any) => {
      state.buildingId = action.payload.id;
      state.numberOfFloors = action.payload.numberOfFloors;
    },
  },
});

export const { setBuildingId } = buildingSlice.actions;

export default buildingSlice;
