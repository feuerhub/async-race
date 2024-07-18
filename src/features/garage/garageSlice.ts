import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createCar, getCars } from './garageThunks';
import { Car, GarageState } from './garageTypes';

const initialState: GarageState = {
    entities: [],
    loading: 'idle',
};


const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(getCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      });
      builder.addCase(getCars.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
      builder.addCase(createCar.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(createCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.loading = 'succeeded';
        state.entities.push(action.payload);
      });
      builder.addCase(createCar.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default garageSlice.reducer;
export const selectAllCars = (state: RootState) => state.garage.entities;
