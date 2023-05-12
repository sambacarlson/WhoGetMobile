import {createSlice} from '@reduxjs/toolkit';
import {askAsyncState} from '../types';
import {createAsks, deleteAsks, fetchAsks, updateAsks} from '../requests';

const initialState: askAsyncState = {
  loading: false,
  asks: [],
  error: '',
};

//slice
const askSlice = createSlice({
  name: 'ask',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //get states
    builder.addCase(fetchAsks.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchAsks.fulfilled, (state, action) => {
      state.loading = false;
      state.asks = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAsks.rejected, (state, action) => {
      state.loading = false;
      state.asks = [];
      state.error =
        action.error.message !== undefined
          ? action.error.message
          : 'an error occurred';
    });
    /// post states
    builder.addCase(createAsks.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(createAsks.fulfilled, state => {
      state.loading = false;
      state.error = '';
      // state.asks = [];
    });
    builder.addCase(createAsks.rejected, (state, action) => {
      state.loading = false;
      // state.asks = [];
      state.error = action.error.message
        ? action.error.message
        : 'an error occured';
    });
    /// update states
    builder.addCase(updateAsks.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateAsks.fulfilled, state => {
      state.loading = false;
      state.error = '';
      // state.asks = [];
    });
    builder.addCase(updateAsks.rejected, (state, action) => {
      state.loading = false;
      // state.asks = [];
      state.error = action.error.message
        ? action.error.message
        : 'an error occured';
    });
    /// delete states
    builder.addCase(deleteAsks.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteAsks.fulfilled, state => {
      state.loading = false;
      state.error = '';
      // state.asks = [];
    });
    builder.addCase(deleteAsks.rejected, (state, action) => {
      state.loading = false;
      // state.asks = [];
      state.error = action.error.message
        ? action.error.message
        : 'an error occured';
    });
  },
});

export default askSlice.reducer;
