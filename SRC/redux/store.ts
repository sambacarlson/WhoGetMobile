import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import askReducer from './slices/askSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ask: askReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
