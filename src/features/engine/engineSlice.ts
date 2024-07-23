import { createSlice } from '@reduxjs/toolkit';
import { EngineState } from './engineTypes';
import { startEngine, stopEngine, switchToDrive } from './engineThunks';
import { RootState } from '../../app/store';

const initialState: EngineState = {
    entities: [],
    loading: 'idle',
};

const engineState = createSlice({
  name: 'engine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startEngine.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(startEngine.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const index = state.entities.findIndex(engine => engine.id === action.payload.id);
        if (index !== -1) {
            state.entities[index] = action.payload;
        } else {
            state.entities.push(action.payload);
        }
    });
      builder.addCase(startEngine.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
      builder.addCase(stopEngine.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(stopEngine.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = state.entities.filter(engine => engine.id !== action.payload);
    });
      builder.addCase(stopEngine.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
      builder.addCase(switchToDrive.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(switchToDrive.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const index = state.entities.findIndex(engine => engine.id === action.payload.id);
            if (index !== -1) {
                state.entities[index].status = action.payload.status;
            }
    });
      builder.addCase(switchToDrive.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default engineState.reducer;
export const selectAllEngineStatuses = (state: RootState) => state.engine.entities;
export const selectEngineById = (id: number) => { (state: RootState) =>
    state.engine.entities.find(engine => engine.id === id);
  };