import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type UserInputsState = {
    createCarName: string;
    createCarColor: string;
    updateCarName: string;
    updateCarColor: string;
}

const initialState: UserInputsState = {
    createCarName: '',
    createCarColor: '#000000',
    updateCarName: '',
    updateCarColor: '#000000'
};

const userInputsSlice = createSlice({
  name: 'userInputs',
  initialState,
  reducers: {
    setCreateCarName: (state, action: PayloadAction<string>) => {
      state.createCarName = action.payload;
    },
    setUpdateCarName: (state, action: PayloadAction<string>) => {
        state.updateCarName = action.payload;
    },
    setCreateCarColor: (state, action: PayloadAction<string>) => {
        state.createCarColor = action.payload;
    },
    setUpdateCarColor: (state, action: PayloadAction<string>) => {
        state.updateCarColor = action.payload;
    },
  }
});

export default userInputsSlice.reducer;
export const { setCreateCarName, setUpdateCarName, setCreateCarColor, setUpdateCarColor } = userInputsSlice.actions;

export const selectCreateCarName = (state: RootState) => state.userInputs.createCarName;
export const selectUpdateCarName = (state: RootState) => state.userInputs.updateCarName;
export const selectCreateCarColor = (state: RootState) => state.userInputs.createCarColor;
export const selectUpdateCarColor = (state: RootState) => state.userInputs.updateCarColor;
