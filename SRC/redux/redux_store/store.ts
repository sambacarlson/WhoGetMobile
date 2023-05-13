import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../services/redux_slices/userSlice';
import askReducer from '../services/redux_slices/askSlice';
import userAuthReducer from '../services/redux_slices/userAuthSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ask: askReducer,
    userAuth: userAuthReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
