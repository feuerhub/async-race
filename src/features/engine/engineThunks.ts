import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Engine } from './engineTypes';

const apiUrl = 'http://127.0.0.1:3000';

export const startEngine = createAsyncThunk<
  Engine,
  number,
  { state: RootState }
>('engine/startEngine', async (id) => {
  const response = await fetch(`${apiUrl}/engine/?id=${id}&status=started`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return { id: id, velocity: data.velocity, status: data.status };
});

export const stopEngine = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('engine/stopEngine', async (id) => {
  const response = await fetch(`${apiUrl}/engine/?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return id;
});

export const switchToDrive = createAsyncThunk<
  { id: number; status: 'broken' | 'drive' },
  number,
  { state: RootState }
>('engine/switchToDrive', async (id) => {
  const response = await fetch(`${apiUrl}/engine/?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    // throw new Error(`Response status: ${response.status}`);
    return { id: id, status: 'broken' };
  }
  const data = await response.json();
  return data.success
    ? { id: id, status: 'drive' }
    : { id: id, status: 'broken' };
});

// export const startAndDrive = createAsyncThunk<
//   Engine,
//   number,
//   { state: RootState }
// >(
//   'engine/switchToDriveMode',
//   (id) => {
//     return fetch(`${apiUrl}/engine/?id=${id}&status=started`, {
//       method: 'PATCH',
//     })
//       .then((startEngineResponse) => {
//         if (!startEngineResponse.ok) {
//           throw new Error(`Response status: ${startEngineResponse.status}`);
//         }
//         return startEngineResponse.json();
//       })
//       .then((startEngineData) => {
//         return fetch(`${apiUrl}/engine/?id=${id}&status=drive`, {
//           method: 'PATCH',
//         }).then((driveResponse) => {
//           if (!driveResponse.ok) {
//             return { id: id, status: 'broke', velocity: startEngineData.velocity };
//           }
//           return driveResponse.json().then((data) => {
//             return data.success
//               ? { id: id, status: 'drive', velocity: startEngineData.velocity }
//               : { id: id, status: 'broke', velocity: startEngineData.velocity };
//           });
//         });
//       });
//   }
// );
