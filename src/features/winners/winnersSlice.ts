import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Winner = {
    id: number;
    wins: number;
    time: number;
};
type WinnersState = {
  entities: Winner[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: WinnersState = {
    entities: [],
    loading: 'idle',
};

export const getWinners = createAsyncThunk<Winner[], void, { state: RootState }>(
    'winners/getWinners',
      async function (_, { rejectWithValue }) {
        try {
          const response = await fetch('http://127.0.0.1:3000/winners');
          if (!response.ok) {
            throw new Error('Server Error!');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWinners.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(getWinners.fulfilled, (state, action: PayloadAction<Winner[]>) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      });
      builder.addCase(getWinners.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default winnersSlice.reducer;
export const selectAllWinners = (state: RootState) => state.winners.entities;
