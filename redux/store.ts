import { configureStore } from '@reduxjs/toolkit';
import storage from './synch_storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (GetDefaultMiddleware) =>
      GetDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
  const persistor = persistStore(store);
  (store as any).persistor = persistor;
  return store;
};