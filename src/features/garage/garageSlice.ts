import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Car = {
    name: string;
    color: string;
    id: number;
};
type GarageState = {
  entities: Car[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: GarageState = {
    entities: [],
    loading: 'idle',
};

// const getCars = createAsyncThunk('garage/fetchCars', async () => {
//   const response = await fetch('/api/garage/cars');
//   if (!response.ok) {
//     throw new Error('Failed to fetch cars');
//   }
//   return (await response.json()) as Car[];
// });
export const getCars = createAsyncThunk<Car[], void, { state: RootState }>(
    'garage/getCars',
      async function (_, { rejectWithValue }) {
        try {
          const response = await fetch('http://127.0.0.1:3000/garage');
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
  },
});

export default garageSlice.reducer;
