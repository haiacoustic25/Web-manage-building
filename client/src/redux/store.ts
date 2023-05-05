import { buildingApi } from './../api/buildingApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './reducer/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rtkQueryError } from './middleware';
import { authApi } from '../api/authApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { roomApi } from '../api/roomApi';
import { customerApi } from '../api/customerApi';
import buildingSlice from './reducer/buildingReducer';
import { reportApi } from '../api/reportApi';
import { statisticalApi } from '../api/statisticalApi';
import { bookingApi } from '../api/bookingApi';
import { furnitureApi } from '../api/furnitureApi';
import { historyApi } from '../api/historyApt';

// const localStorageMiddleware = ({ getState }: any) => {
//   return (next: any) => (action: any) => {
//     const result = next(action);
//     localStorage.setItem("applicationState", JSON.stringify(getState()));
//     return result;
//   };
// };

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  dataUser: authSlice.reducer,
  buildingId: buildingSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [statisticalApi.reducerPath]: statisticalApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [buildingApi.reducerPath]: buildingApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [furnitureApi.reducerPath]: furnitureApi.reducer,
});
// const rootReducer = {
//
// };
console.log({ rootReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  // devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      buildingApi.middleware,
      reportApi.middleware,
      roomApi.middleware,
      customerApi.middleware,
      statisticalApi.middleware,
      bookingApi.middleware,
      furnitureApi.middleware,
      historyApi.middleware,
      rtkQueryError
    ),
});

setupListeners(store.dispatch);

// let persistor = persistStore(store);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
