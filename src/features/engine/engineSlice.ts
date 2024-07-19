import { createSlice } from '@reduxjs/toolkit';
import { EngineState } from './engineTypes';
import { startStopEngine } from './engineThunks';

const initialState: EngineState = {
    entities: [],
    loading: 'idle',
};

const engineState = createSlice({
  name: 'engine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startStopEngine.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(startStopEngine.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        if (action.payload.status === 'stopped'){
            state.entities = state.entities.filter(engine => engine.id !== action.payload.data.id);
        } else {
            state.entities.push(action.payload.data)
        }
      });
      builder.addCase(startStopEngine.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default engineState.reducer;
