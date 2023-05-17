import {createSlice} from '@reduxjs/toolkit';

interface googleAuthInfoType {
  uid: string;
  email?: string;
  username: string;
  photo: string;
  interests: string[];
  whatsapp?: number;
  telephone?: number;
}

const initialState = {} as googleAuthInfoType;

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export default userAuthSlice.reducer;
export const {setUserAuth} = userAuthSlice.actions;
