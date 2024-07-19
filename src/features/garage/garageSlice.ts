import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createCar, deleteCar, getCars, updateCar } from './garageThunks';
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
      builder.addCase(updateCar.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.loading = 'succeeded';
        const index = state.entities.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      });
      builder.addCase(updateCar.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
      builder.addCase(deleteCar.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(deleteCar.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = 'succeeded';
        state.entities = state.entities.filter(car => car.id !== action.payload);
      });
      builder.addCase(deleteCar.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default garageSlice.reducer;
export const selectAllCars = (state: RootState) => state.garage.entities;
