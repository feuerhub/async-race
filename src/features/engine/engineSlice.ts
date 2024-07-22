import { createSelector, createSlice } from '@reduxjs/toolkit';
import { EngineState } from './engineTypes';
import { startStopEngine, switchToDriveMode } from './engineThunks';
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
    builder.addCase(startStopEngine.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(startStopEngine.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        if (action.payload.status === 'stopped') {
            state.entities = state.entities.filter(engine => engine.id !== action.payload.data.id);
        } else {
            const index = state.entities.findIndex(engine => engine.id === action.payload.data.id);
            if (index !== -1) {
                state.entities[index] = {...action.payload.data, status: 'started'};
            } else {
                state.entities.push({...action.payload.data, status: 'started'});
            }
        }
    });
      builder.addCase(startStopEngine.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
      builder.addCase(switchToDriveMode.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(switchToDriveMode.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const index = state.entities.findIndex(engine => engine.id === action.payload.id);
            if (index !== -1) {
                state.entities[index].status = action.payload.drive;
            }
    });
      builder.addCase(switchToDriveMode.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default engineState.reducer;
export const selectAllEngineStatuses = (state: RootState) => state.engine.entities;

export const selectAllRaceReady = createSelector(
    [selectAllEngineStatuses],
    (engine) => engine.every(item => item.status === 'drive' || 'broke')
  )
//   export const selectAllEnginesStarted = createSelector(
//     [selectAllEngineStatuses],
//     (engine) => engine.every(item => item.status === 'started')
//   )