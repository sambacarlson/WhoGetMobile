import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userAsyncState, userType} from '../types';
import axios from 'axios';

const initialUserState: userType = {
  _id: '',
  username: '',
  interests: [],
  status: {
    banned: false,
    bannedDate: '',
  },
  telephone: 0,
  createdAt: '',
  updatedAt: '',
};
const initialState: userAsyncState = {
  loading: false,
  user: initialUserState,
  error: '',
};

// get single user
export const fetchUser = createAsyncThunk(
  'user/fetchUsers',
  (google_id: string) => {
    return axios
      .get(`https://whoget-api.onrender.com/api/users${google_id}`)
      .then(response => response.data);
  },
);
export const createUser = createAsyncThunk(
  'user/createUser',
  (userObject: any) => {
    return axios
      .post('https://whoget-api.onrender.com/api/users', userObject)
      .then(response => response.data);
  },
);

// create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
      state.user = initialUserState;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = initialUserState;
      state.error =
        action.error.message !== undefined
          ? action.error.message
          : 'an error occurred';
    });
  },
});

export default userSlice.reducer;
