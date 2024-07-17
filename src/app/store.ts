import { configureStore } from '@reduxjs/toolkit';
import garageReducer from '../features/garage/garageSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
