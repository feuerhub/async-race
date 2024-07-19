import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Car } from "./garageTypes";

const apiUrl = 'http://127.0.0.1:3000';

export const getCars = createAsyncThunk<
    Car[], 
    void, 
    {state: RootState }>(
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

export const createCar = createAsyncThunk<
    Car, 
    {name: string, color: string}, 
    { state: RootState }>(
    'garage/createCar', 
    async (carData) => {
    const response = await fetch(`${apiUrl}/garage`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
});

export const updateCar = createAsyncThunk<
    Car, 
    {carId: number, carData: {name: string, color: string}}, 
    { state: RootState }>(
    'garage/updateCar', 
    async ({carId, carData}) => {
    const response = await fetch(`${apiUrl}/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  });

export const deleteCar = createAsyncThunk<
    number, 
    number, 
    { state: RootState }>(
    'garage/deleteCar', 
    async (carId) => {
    const response = await fetch(`${apiUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return carId;
  });