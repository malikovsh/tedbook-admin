import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import orderDetailsReducer from './reducers/orderDetail';
import productsReducer from './reducers/product';
import usersReducer from './reducers/users';
import warehouseReducer from './reducers/warehouse';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
  orderDetails: orderDetailsReducer,
  warehouse: warehouseReducer,
});

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'users',
    'orderStatus',
    'products',
    'orderDetails',
    'warehouse',
  ],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
