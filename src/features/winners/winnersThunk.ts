import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Winner } from './winnerType';

const apiUrl = 'http://127.0.0.1:3000';

export const getWinners = createAsyncThunk<
  Winner[],
  void,
  { state: RootState }
>('winners/getWinners', async function () {
  const response = await fetch(`${apiUrl}/winners`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return data;
});

export const addWinner = createAsyncThunk<Winner, Winner, { state: RootState }>(
  'winners/addWinner',
  async (winner) => {
    const response = await fetch(`${apiUrl}/winners/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
);

export const updateWinner = createAsyncThunk<
  Winner,
  Winner,
  { state: RootState }
>('winners/updateWinner', async ({ id, wins, time }) => {
  const response = await fetch(`${apiUrl}/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return { id: id, ...data };
});

export const deleteWinner = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('winners/deleteWinner', async (id) => {
  const response = await fetch(`${apiUrl}/winners/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return id;
});
