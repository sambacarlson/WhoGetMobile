import {createSlice} from '@reduxjs/toolkit';
import {userType} from '../../global/types';

const initialState = {} as userType;
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    populateUser: (state, action) => {
      return {...action.payload};
    },
  },
});

export const {populateUser} = userSlice.actions;
export default userSlice.reducer;
