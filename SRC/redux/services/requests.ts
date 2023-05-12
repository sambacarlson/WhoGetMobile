import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//get request
export const fetchAsks = createAsyncThunk('ask/fetchAsks', () => {
  return axios
    .get('https://whoget-api.onrender.com/api/asks')
    .then(response => response.data);
});

//post request
export const createAsks = createAsyncThunk(
  'ask/createAsks',
  async (newAsk: any) => {
    return axios
      .post('https://whoget-api.onrender.com/api/asks', newAsk)
      .then(response => response.data);
  },
);

//patch request
export const updateAsks = createAsyncThunk(
  'ask/updateAsks',
  (_id, updateData) => {
    return axios
      .patch(`https://whoget-api.onrender.com/api/asks/${_id}`, updateData)
      .then(response => response.data);
  },
);
//delete request
export const deleteAsks = createAsyncThunk('ask/deleteAsks', _id => {
  return axios
    .delete(`https://whoget-api.onrender.com/api/asks/${_id}`)
    .then(response => response.data);
});
