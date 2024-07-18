import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Car } from "./garageTypes";

const apiUrl = 'http://127.0.0.1:3000';

export const getCars = createAsyncThunk(
    'garage/getCars',
      async () => {
          const response = await fetch(`${apiUrl}/garage`);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const data = await response.json();
          return data;
      }
    );

export const createCar = createAsyncThunk(
    'garage/createCar', 
    async (newCar) => {
    const response = await fetch(`${apiUrl}/garage`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
});