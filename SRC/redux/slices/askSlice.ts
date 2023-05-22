import {createSlice} from '@reduxjs/toolkit';
import {askType} from '../../global/types';

const initialState = [] as askType[];

const askSlice = createSlice({
  name: 'ask',
  initialState,
  reducers: {
    populateAsks: (state, action) => {
      return [...action.payload];
    },
    createAsk: (state, action) => {
      return [...state, action.payload];
    },
    updateAsk: (state, action) => {
      return state.map(ask => {
        if (ask._id === action.payload._id) {
          return action.payload;
        } else {
          return ask;
        }
      });
    },
    deleteAsk: (state, action) => {
      return state.filter(ask => ask._id !== action.payload);
    },
  },
});

export const {populateAsks, createAsk, updateAsk, deleteAsk} = askSlice.actions;
export default askSlice.reducer;
