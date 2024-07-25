import { configureStore } from '@reduxjs/toolkit';
import garageReducer from '../features/garage/garageSlice';
import winnersReducer from '../features/winners/winnersSlice';
import engineSlice from '../features/engine/engineSlice';
import userInputs from '../features/userInputs/userInputs';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    engine: engineSlice,
    userInputs: userInputs,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
