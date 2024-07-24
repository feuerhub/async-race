import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  addWinner,
  deleteWinner,
  getWinners,
  updateWinner,
} from './winnersThunk';
import { Winner, WinnersState } from './winnerType';

const initialState: WinnersState = {
  entities: [],
  loading: 'idle',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWinners.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(
      getWinners.fulfilled,
      (state, action: PayloadAction<Winner[]>) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      },
    );
    builder.addCase(getWinners.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
    builder.addCase(addWinner.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(
      addWinner.fulfilled,
      (state, action: PayloadAction<Winner>) => {
        state.loading = 'succeeded';
        state.entities.push(action.payload);
      },
    );
    builder.addCase(addWinner.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
    builder.addCase(updateWinner.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(
      updateWinner.fulfilled,
      (state, action: PayloadAction<Winner>) => {
        state.loading = 'succeeded';
        const index = state.entities.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      },
    );
    builder.addCase(updateWinner.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
    builder.addCase(deleteWinner.pending, (state) => {
      state.loading = 'pending';
      state.error = undefined;
    });
    builder.addCase(
      deleteWinner.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = 'succeeded';
        state.entities = state.entities.filter(
          (winner) => winner.id !== action.payload,
        );
      },
    );
    builder.addCase(deleteWinner.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default winnersSlice.reducer;
export const selectAllWinners = (state: RootState) => state.winners.entities;
