import {createSlice} from '@reduxjs/toolkit';
import {userType} from '../../global/types';

const initialState = [] as userType[];
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    populateUsers: (state, action) => {
      return [...action.payload];
    },
    createUser: (state, action) => {
      return [...state, action.payload];
    },
    updateUser: (state, action) => {
      return state.map(user => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });
    },
  },
});

export const {populateUsers, createUser, updateUser} = userSlice.actions;
export default userSlice.reducer;
