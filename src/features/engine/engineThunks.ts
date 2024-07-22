import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Engine } from "./engineTypes";

const apiUrl = 'http://127.0.0.1:3000';

export const startStopEngine = createAsyncThunk<
    {status: string, data: Engine}, 
    {carId: number, status: 'started' | 'stopped'}, 
    {state: RootState }>(
    'engine/startStopEngine', 
    async ({ carId, status }) => {
    const response = await fetch(`${apiUrl}/engine/?id=${carId}&status=${status}`, {
        method: 'PATCH'
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return {status: status, data: {id: carId, ...data}};
  });

export const switchToDriveMode = createAsyncThunk<
    {id: number, drive: 'broke' | 'drive'}, 
    number, 
    {state: RootState }>(
    'engine/switchToDriveMode', 
    async (carId) => {
        const response = await fetch(`${apiUrl}/engine/?id=${carId}&status=drive`, {
            method: 'PATCH'
        });
        if (!response.ok) {
            // throw new Error(`Response status: ${response.status}`);
            return {id: carId, drive: 'broke'};
        }
        const data = await response.json();
        return {id: carId, drive: 'drive'};
      });